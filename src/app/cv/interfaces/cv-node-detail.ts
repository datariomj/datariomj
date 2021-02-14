import { NodeDetail } from '@core/interfaces/node-detail';

export interface CvNodeDetail extends NodeDetail<CvNodeDetail> {
  route: string;
}

