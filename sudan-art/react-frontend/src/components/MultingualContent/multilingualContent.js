import { useContext } from "react";
import { LanguageContext } from "../../multilingualContext/context.js";
import { translations } from "../../multilingualContext/translations.js";

/**
 * Utility function to generate text dependant on the language
 * @param {props} props destructured just for the contentID
 * @return {component} multilingual content component
 */
export default function MultiLingualContent({ contentID }) {
  const { language } = useContext(LanguageContext);

  return translations[language][contentID];
}
