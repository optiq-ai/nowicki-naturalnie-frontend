// Custom hook for playing sounds in the application
export const useSound = () => {
  const playSound = (soundName) => {
    try {
      const audio = new Audio(`/sounds/${soundName}.mp3`);
      audio.volume = 0.5; // Set volume to 50%
      audio.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  const playPigGrunt = () => {
    playSound('pig_grunt');
  };

  const playButtonClick = () => {
    playSound('button_click');
  };

  return {
    playPigGrunt,
    playButtonClick,
    playSound
  };
};

export default useSound;
