import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postLogin, registerServer } from "./thunks";

import { AuthenticationStateType, AuthStateEnum } from "./types";

const initialState: AuthenticationStateType = {
  authState: AuthStateEnum.LOGIN,
  loginState: 0,
  summary : "**Clinical Notes**\n\n**Patient:** [Name not provided]\n\n**Date:** [Date of consultation not provided]\n\n**Chief Complaint:** Chronic headaches\n\n**History of Present Illness:**\n- Patient reports experiencing daily headaches for many years, starting in their teens, around age 14.\n- Describes headaches as intense, often localized behind the right eye, but sometimes generalized.\n- Associated symptoms include weakness on the right side of the face, nausea (without vomiting), photophobia, and phonophobia.\n- Headaches can last for hours if untreated; sleep or pain medication may alleviate symptoms.\n- Pain is described as stabbing and throbbing.\n- Frequency varies with stress levels; can occur every other day or be absent for months.\n- Stressful work environment and recent managerial changes may be exacerbating factors.\n- Patient has been self-medicating with Tylenol, which provides partial relief.\n\n**Past Medical History:**\n- History of head injuries in childhood, one incident requiring stitches and causing loss of consciousness.\n\n**Medications:**\n- Tylenol as needed for headache pain.\n\n**Social History:**\n- Work-related stress mentioned as a significant factor in life.\n\n**Review of Systems:**\n- No reported blurry vision or increased urinary frequency.\n- No weakness in arms or legs.\n\n**Physical Examination:**\n- Not documented in the transcript.\n\n**Assessment/Plan:**\n- The patient's symptoms are suggestive of migraine headaches, particularly given the unilateral location, associated symptoms, and triggers.\n- Recommended initial conservative management focusing on stress reduction techniques such as yoga or Tai Chi.\n- Consideration for prescription medication if conservative measures are ineffective.\n- Botox treatment discussed as a future option if the patient fails to respond to at least two preventive medications.\n- Follow-up appointment to be scheduled to reassess headache frequency and response to interventions.\n\n**Recommendations:**\n- Continue Tylenol as needed for pain relief.\n- Explore stress mitigation strategies and relaxation techniques.\n- Monitor headache frequency and severity in relation to stress levels.\n- Consider further diagnostic workup or referral to a headache specialist if symptoms persist or worsen.\n\n**Physician:** Dr. Naveed, Neurology Team\n\n**Next Appointment:** To be scheduled for follow-up\n\n[End of Clinical Notes]",
  transcript : ""
};

export const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        authState: action.payload,
      };
    },
    setLoginState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        loginState: action.payload,
      };
    },
    setSummaryState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        summary: action.payload,
      };
    },
    setTranscriptState: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        transcript: action.payload,
      };
    },
  },
  extraReducers(builder) {
    builder.addCase(registerServer.fulfilled, (state, action) => {
      state.authState = AuthStateEnum.LOGIN;
      state.loginState = 1;
    });
    builder.addCase(registerServer.rejected, (state, action) => {});
    builder.addCase(postLogin.fulfilled, (state, action) => {
      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("user_name", action.payload.userName);
      localStorage.setItem("user_roles", action.payload.roles)
    });
    builder.addCase(postLogin.rejected, (state, action) => {});
  },
});
export const { setAuthState, setLoginState, setTranscriptState, setSummaryState } =
  authentication.actions;
export default authentication.reducer;
