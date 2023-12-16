import { RootState } from '../../../Store/index';

export const selectUser = (state: RootState) => state;
export const selectSummary = (state: RootState) => state.AuthenticationReducer.summary;
export const selectTranscript = (state: RootState) => state.AuthenticationReducer.transcript;