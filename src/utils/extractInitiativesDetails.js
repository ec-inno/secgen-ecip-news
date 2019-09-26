const extractInitiativesDetails = ({ details, locale }) => {
  const linguisticVersions =
    details && Object.keys(details).length !== 0
      ? Object.values(details.linguisticVersions)
      : [];

  // Try to get content for the current locale.
  let linguisticVersionIsFallback = false;
  let linguisticVersion = linguisticVersions.find(
    version => version.languageCode.toLowerCase() === locale
  );

  if (!linguisticVersion) {
    // Fallback to original language.
    // Information display should be "all or nothing", so we override, and all other props are coming from the original.
    linguisticVersion = linguisticVersions.find(version => version.original);
    linguisticVersionIsFallback = true;
  }

  /**
   * Information from `details`.
   */
  const status = details && details.status ? details.status : '';
  const deadline = details && details.deadline ? details.deadline : '';
  const registrationNumber =
    details && details.comRegNum ? details.comRegNum : '';
  const progress = details && details.progress ? details.progress : [];
  const funding = details && details.funding ? details.funding : {};
  const members = details && details.members ? details.members : [];
  const submission = details && details.submission ? details.submission : {};
  const isPartiallyRegistered = details && details.partiallyRegistered;
  const dateRefusal = details.refusalDate ? details.refusalDate : '';
  const dateRegistration = details.registrationDate
    ? details.registrationDate
    : '';
  const supportLink = details.supportLink ? details.supportLink : '';
  const refusalReasons = details.refusalReasons ? details.refusalReasons : [];
  const dateStart =
    details && details.startCollectionDate ? details.startCollectionDate : '';
  const dateEnd =
    details && details.earlyClosureDate ? details.earlyClosureDate : '';

  /**
   * Information from `linguisticVersion`.
   */
  const title =
    linguisticVersion && linguisticVersion.title
      ? linguisticVersion.title
      : '...';

  const draftLegal =
    linguisticVersion && linguisticVersion.draftLegal
      ? linguisticVersion.draftLegal
      : {};

  const additionalDocument =
    linguisticVersion && linguisticVersion.additionalDocument
      ? linguisticVersion.additionalDocument
      : {};

  const annexText =
    linguisticVersion && linguisticVersion.annexText
      ? linguisticVersion.annexText
      : '';

  const treaties =
    linguisticVersion && linguisticVersion.treaties
      ? linguisticVersion.treaties
      : '';

  const website =
    linguisticVersion && linguisticVersion.website
      ? linguisticVersion.website
      : '';

  const objectives =
    linguisticVersion && linguisticVersion.objectives
      ? linguisticVersion.objectives
      : '';

  const decisionUrl =
    linguisticVersion && linguisticVersion.decisionUrl
      ? linguisticVersion.decisionUrl
      : '';

  return {
    additionalDocument,
    annexText,
    dateEnd,
    dateRefusal,
    dateRegistration,
    dateStart,
    deadline,
    decisionUrl,
    draftLegal,
    funding,
    isPartiallyRegistered,
    linguisticVersionIsFallback,
    members,
    objectives,
    progress,
    refusalReasons,
    registrationNumber,
    status,
    submission,
    supportLink,
    title,
    treaties,
    website,
  };
};

export default extractInitiativesDetails;
