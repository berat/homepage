import { Locale, messages } from "@/lib/i18n";

const ViewsSuspense = ({ locale, isLike=false }: { locale: Locale, isLike?: boolean }) => {
  const texts = messages[locale];

  return (
    <>
      {isLike ? texts.suspense.likes : texts.suspense.views}
    </>
  );
};

export default ViewsSuspense;
