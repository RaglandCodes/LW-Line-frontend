export async function share(target, story, setShowShareMenu) {
  if (target === 'native') {
    if (navigator.share) {
      navigator
        .share({
          title: story.title,
          url: story.link,
        })
        .then(() => console.log('Successful share'))
        .catch(error => {
          console.log('Error sharing', error);
          setShowShareMenu(true);
        });
    } else {
      setShowShareMenu(true);
    }
    return;
  }

  let shareUrls = {
    facebook: ``,
    twitter: ``,
    linkedin: ``,
    whatsapp: ``,
  };

  window.open(shareUrls.target);
}
