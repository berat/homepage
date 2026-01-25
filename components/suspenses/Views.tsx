import { Locale, messages } from "@/lib/i18n";

const ViewsSuspense = ({ locale }: { locale: Locale }) => {
  const texts = messages[locale];

  return (
    <>
      {texts.suspense.views}
    </>
  );
};

export default ViewsSuspense;
