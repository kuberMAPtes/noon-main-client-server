
export const navigateMainPage = (encryptedToId,IV,navigate) => {
    const mainPageUri = process.env.REACT_APP_MAIN_PAGE_URI
    console.log("mainPageUri :: ",mainPageUri);
    console.log("mainPageUri :: encryptedToId :: ",encryptedToId);
    console.log("mainPageUri :: IV :: ",IV);

    const navigateUri = `${mainPageUri}/${encryptedToId}/${IV}`;
    navigate(navigateUri);
}