import mitt from 'mitt';

type Events = {
  'book-updated': void;
};

export const eventBus = mitt<Events>(); 
