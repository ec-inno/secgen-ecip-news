import messages from './messages.json';

export const reasonsSupported = [
  'reason.action.registration.reject.abuse',
  'reason.action.registration.reject.competences',
  'reason.action.registration.reject.requirements',
  'reason.action.registration.reject.values',
];

export const getTranslation = ({ code, language }) =>
  messages.find(
    message => message.LNG_CODE === language && message.RTR_KEY === code
  );

export const getReasons = ({ input, language }) => {
  const output = [];

  input.forEach(reason => {
    if (reasonsSupported.includes(reason)) {
      const translation = getTranslation({ code: reason, language });
      if (translation) {
        output.push(translation);
      }
    }
  });

  return output;
};
