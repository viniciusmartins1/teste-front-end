const ONE_MINUTE_IN_SECONDS = 60;
const ONE_HOUR_IN_SECONDS = 3600;

export const formatterDuration = (seconds: number): string => {
  if (!seconds) return '';

  if (seconds <= ONE_MINUTE_IN_SECONDS) return '1min';

  var h = Math.floor(seconds / ONE_HOUR_IN_SECONDS);
  var m = Math.floor((seconds % ONE_HOUR_IN_SECONDS) / ONE_MINUTE_IN_SECONDS);

  var hDisplay = h > 0 ? h + (h === 1 ? 'hr ' : 'hr ') : '';
  var mDisplay = m + (m == 1 ? 'min' : 'min');

  return hDisplay + mDisplay;
};

export const capitalizeFirstLetter = (text: string) => {
  return String(text).charAt(0).toUpperCase() + String(text).slice(1);
};

export const formatterDate = (date: string) => {
  if (!date) return '';

  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'medium',
  }).format(new Date(date));
};
