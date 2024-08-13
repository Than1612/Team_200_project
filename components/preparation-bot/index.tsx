'use client';

import dynamic from 'next/dynamic';
import { SituationSkeleton } from './SituationSkeleton';
import { ItemSuggestionsSkeleton } from './ItemSuggestionsSkeleton';
import { TrendingOutfitsSkeleton } from './TrendingOutfitsSkeleton';
import { EventsSkeleton } from './EventsSkeleton';
export { default as RedirectPopup } from './RedirectPopup';

export { spinner } from './spinner';
export { BotCard, BotMessage, SystemMessage } from './message';

const Situation = dynamic(() => import('./Situation').then(mod => mod.Situation), {
  ssr: false,
  loading: () => <SituationSkeleton />,
});

const ItemSuggestions = dynamic(
  () => import('./ItemSuggestion').then(mod => mod.ItemSuggestions),
  {
    ssr: false,
    loading: () => <ItemSuggestionsSkeleton />,
  },
);

const TrendingOutfits = dynamic(
  () => import('./TrendingOutfits').then(mod => mod.TrendingOutfits),
  {
    ssr: false,
    loading: () => <TrendingOutfitsSkeleton />,
  },
);

const Events = dynamic(() => import('./Events').then(mod => mod.Events), {
  ssr: false,
  loading: () => <EventsSkeleton />,
});

export { Situation, ItemSuggestions, TrendingOutfits, Events };
