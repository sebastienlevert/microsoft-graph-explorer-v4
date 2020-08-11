import { IAutoCompleteProps } from "../../../../types/auto-complete";

export function cleanUpSelectedSuggestion(compare: string, userInput: string, selected: string) {
  let finalSelectedSuggestion = `${userInput + selected}`;
  if (compare) {
    /**
     * Removes the characters used to filter the suggestions
     * and replaces them with the provided suggestion
     * together with the sign that was in the query string before
     * autosuggestion
     */
    const availableSignPrefixes = ['?', ',', '=', '&', '/'];
    let entryToRemove = '';
    let activeSign = '/';
    for (const sign of availableSignPrefixes) {
      const compareStringWithSign = `${sign + compare}`;
      if (userInput.includes(compareStringWithSign)) {
        entryToRemove = compareStringWithSign;
        activeSign = sign;
        break;
      }
    }
    finalSelectedSuggestion = userInput.replace(entryToRemove, activeSign);
    return finalSelectedSuggestion + selected;
  }
  return finalSelectedSuggestion;
}

export function getParametersWithVerb(properties: IAutoCompleteProps) {
  const { autoCompleteOptions, sampleQuery: { selectedVerb } } = properties;
  if (!autoCompleteOptions) {
    return;
  }
  const parameters = autoCompleteOptions.parameters;
  if (!parameters) {
    return;
  }
  return parameters.find(parameter => parameter.verb === selectedVerb.toLowerCase());
}