export interface StackItem {
  name: string;
  symbol: string;
  yearStarted: number;
  type: string;
  iconText: string;
  iconImage: {
    sys: {
      type: string;
      linkType: string;
      id: string;
    };
  };
  tags: string[];
}
