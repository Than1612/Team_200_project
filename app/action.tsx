import 'server-only';

import { createAI, createStreamableUI, getMutableAIState } from 'ai/rsc';
import OpenAI from 'openai';

import {
  spinner,
  BotCard,
  BotMessage,
  SystemMessage,
  Situation,
  ItemSuggestions,
  TrendingOutfits,
  Events,
} from '@/components/preparation-bot';

import {
  runAsyncFnWithoutBlocking,
  sleep,
  runOpenAICompletion,
} from '@/lib/utils';
import { z } from 'zod';
import { SituationSkeleton } from '@/components/preparation-bot/SituationSkeleton';
import { ItemSuggestionsSkeleton } from '@/components/preparation-bot/ItemSuggestionsSkeleton';
import { TrendingOutfitsSkeleton } from '@/components/preparation-bot/TrendingOutfitsSkeleton';
import { EventsSkeleton } from '@/components/preparation-bot/EventsSkeleton';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

async function submitUserMessage(content: string) {
  'use server';

  const aiState = getMutableAIState<typeof AI>();
  aiState.update([
    ...aiState.get(),
    {
      role: 'user',
      content,
    },
  ]);

  const reply = createStreamableUI(
    <BotMessage className="items-center">{spinner}</BotMessage>,
  );

  const completion = runOpenAICompletion(openai, {
    model: 'gpt-4o',
    stream: true,
    messages: [
      {
        role: 'system',
        content: `\
        You are a helpful assistant bot designed to help users prepare for various situations, such as meetings, events, or casual outings. When a user asks for a query, explain the situation and provide a list of necessary items required for that particular situation.
        For example: 
        User has mentioned a business meeting - means that an interface showing business meeting preparation is presented to the user. Once presented means no need to display again. 
        User has chosen a formal outfit - means that the user has selected a formal outfit in the UI.Once presented means no need to display again.
        If the user requests a specific situation, call show_situation_ui to show the relevant preparation UI.
        If the user just wants suggestions for a particular item, call show_item_suggestions to show the item suggestions.
        The items being suggested must be listed out in a list one after the other so that the user can easily comprehend.Put out the icons for the items present in that list,Put out the icons for the items present in that list, where the icons must be small, simple graphic that uses minimal detail and a limited color palette to represent a function or concept clearly and consistently within a user interface.
        If you want to show trending outfits, call list_trending_outfits.
        If you want to show events, call get_events. If events comes into picture, ask the user information regarding the event and asks to type out Things Required after giving information regarding the event situation. 
        The items being suggested must be listed out in a list so that the user can easily comprehend.Put out the icons for the items present in that list, where the icons must be small, simple graphic that uses minimal detail and a limited color palette to represent a function or concept clearly and consistently within a user interface.
        If the user wants to complete a task that is not possible in this demo, respond that you are a demo and cannot do that.
        Items should be present, one in each line with commas.
        For anything other than the situation mentioned by the user or related to listing items, respond that you cannot assist with other queries. If any other text other than the details regarding the situation mentioned by the user or related to listing items or normal conversations, respond that you cannot assist with other queries.`,
      },
      ...aiState.get().map((info: any) => ({
        role: info.role,
        content: info.content,
        name: info.name,
      })),
    ],
    functions: [
      {
        name: 'show_situation_ui',
        description: 'Show preparation UI for a specific situation.',
        parameters: z.object({
          situation: z.string().describe('The type of situation e.g. business meeting, casual outing.'),
        }),
      },
      {
        name: 'show_item_suggestions',
        description: 'Show item suggestions for a specific situation.',
        parameters: z.object({
          situation: z.string().describe('The type of situation e.g. business meeting, casual outing.'),
          items: z.array(z.string()).describe('List of suggested items for the situation.'),
        }),
      },
      {
        name: 'list_trending_outfits',
        description: 'List trending outfits.',
        parameters: z.object({
          outfits: z.array(
            z.object({
              name: z.string().describe('The name of the outfit.'),
              description: z.string().describe('Description of the outfit.'),
            }),
          ),
        }),
      },
      {
        name: 'get_events',
        description: 'List events.',
        parameters: z.object({
          events: z.array(
            z.object({
              date: z.string().describe('The date of the event, in ISO-8601 format'),
              headline: z.string().describe('The headline of the event'),
              description: z.string().describe('The description of the event'),
            }),
          ),
        }),
      },
    ],
    temperature: 0,
  });

  completion.onTextContent((content: string, isFinal: boolean) => {
    reply.update(<BotMessage>{content}</BotMessage>);
    if (isFinal) {
      reply.done();
      aiState.done([...aiState.get(), { role: 'assistant', content }]);
    }
  });

  completion.onFunctionCall('list_trending_outfits', async ({ outfits }) => {
    reply.update(
      <BotCard>
        <TrendingOutfitsSkeleton />
      </BotCard>,
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <TrendingOutfits outfits={outfits} />
      </BotCard>,
    );

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'list_trending_outfits',
        content: JSON.stringify(outfits),
      },
    ]);
  });

  completion.onFunctionCall('get_events', async ({ events }) => {
    reply.update(
      <BotCard>
        <EventsSkeleton />
      </BotCard>,
    );

    await sleep(1000);

    reply.done(
      <BotCard>
        <Events events={events} />
      </BotCard>,
    );

    aiState.done([
      ...aiState.get(),
      {
        role: 'function',
        name: 'get_events',
        content: JSON.stringify(events),
      },
    ]);
  });

  completion.onFunctionCall(
    'show_situation_ui',
    async ({ situation }) => {
      reply.update(
        <BotCard>
          <SituationSkeleton />
        </BotCard>,
      );

      await sleep(1000);

      reply.done(
        <BotCard>
          <Situation name={situation} />
        </BotCard>,
      );

      aiState.done([
        ...aiState.get(),
        {
          role: 'function',
          name: 'show_situation_ui',
          content: `[Situation: ${situation}]`,
        },
      ]);
    },
  );

  completion.onFunctionCall(
    'show_item_suggestions',
    async ({ situation, items }) => {
      reply.update(
        <BotCard>
          <ItemSuggestionsSkeleton />
        </BotCard>,
      );

      await sleep(1000);

      reply.done(
        <BotCard>
          <ItemSuggestions situation={situation} items={items} />
        </BotCard>,
      );

      aiState.done([
        ...aiState.get(),
        {
          role: 'function',
          name: 'show_item_suggestions',
          content: `[Items for ${situation}: ${items.join(', ')}]`,
        },
      ]);
    },
  );

  return {
    id: Date.now(),
    display: reply.value,
  };
}

// Define necessary types and create the AI.

const initialAIState: {
  role: 'user' | 'assistant' | 'system' | 'function';
  content: string;
  id?: string;
  name?: string;
}[] = [];

const initialUIState: {
  id: number;
  display: React.ReactNode;
}[] = [];

export const AI = createAI({
  actions: {
    submitUserMessage,
  },
  initialUIState,
  initialAIState,
});
