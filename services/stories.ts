import { Story, StoryItem } from '@prisma/client';

import { axiosInstance } from './instance';

export type IStory = Story & {
    items: StoryItem[];
};

export const getAll = async () => {
    return (await axiosInstance.get<IStory[]>('/stories')).data;
};