import { request } from '@utils/request';
import { errorHandler } from '@utils/errorHandlerAxios';
import { SERIES } from '@utils/endpoints';
import type {
  GetSeriesParams,
  GetSeriesResponse,
  Serie,
} from '@globalTypes/serieServices';

export const getSeries = async <T extends GetSeriesResponse>(
  params: GetSeriesParams = {}
) => {
  try {
    const { data } = await request<T>(SERIES, { params });
    return data;
  } catch (reason) {
    throw new Error(errorHandler(reason)).message;
  }
};

export const getSerie = async <T extends Serie>(serieId: string) => {
  try {
    const { data } = await request<T[]>(`${SERIES}/${serieId}`);
    return data[0];
  } catch (reason) {
    throw new Error(errorHandler(reason)).message;
  }
};
