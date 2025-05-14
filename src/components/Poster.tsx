import React, { useEffect, useState } from 'react';
import './Poster.css';
import tge from '../assets/tge.svg';
import { RepeatIcon } from './RepeatIcon';
import { NoRepeatIcon } from './NoRepeatIcon';
import { ClashIcon } from './ClashIcon';

interface PosterProps {
  data: any[];
}

type BandData = {
  wed: any[];
  thu: any[];
  fri: any[];
  sat: any[];
};

const convertTime12to24 = (time12h: any): { time: string; date: string } => {
  const [time, modifier] = time12h.split(' ');

  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'pm') {
    hours = parseInt(hours, 10) + 12;
  }
  if (modifier === 'am') {
    hours = parseInt(hours, 10);
  }
  const actualDate = hours < 5 ? '2025-05-16' : '2025-05-15';
  return { time: `${hours}:${minutes}`, date: actualDate };
};
{
  /*
const isShit = (genre: string[], description: string): boolean => {
  if (!genre) {
    return false;
  }
  const isShit: boolean =
    genre.join(',').indexOf('jazz') > -1 ||
    genre.join(',').indexOf('shoegaze') > -1 ||
    genre.join(',').indexOf('grime') > -1 ||
    genre.join(',').indexOf('spoken') > -1 ||
    genre.join(',').indexOf('bedroom') > -1 ||
    genre.join(',').indexOf('house') > -1 ||
    genre.join(',').indexOf('gospel') > -1 ||
    description.indexOf('dream pop') > -1 ||
    description.indexOf('dreamy') > -1 ||
    description.indexOf('TikTok') > -1 ||
    description.indexOf('Spotlight') > -1 ||
    description.indexOf('Radio 1') > -1 ||
    description.indexOf('avant-garde') > -1 ||
    description.indexOf('emotional reflection') > -1;

  return isShit;
};

const isGoodVenue = (venue: string): boolean => {
  if (!venue) {
    return false;
  }
  const isShit: boolean =
    venue.indexOf('Prince Albert') > -1 ||
    venue.indexOf('Horatios') > -1 ||
    venue.indexOf('Green Door Store') > -1 ||
    venue.indexOf('Volks') > -1;
  return isShit;
};

const isRock = (genre: string[], description: string): boolean => {
  if (!genre) {
    return false;
  }
  const isRock: boolean =
    genre.join(',').indexOf('punk') > -1 ||
    genre.join(',').indexOf('celtic') > -1 ||
    genre.join(',').indexOf('metal') > -1 ||
    genre.join(',').indexOf('rock') > -1 ||
    description.indexOf('punk') > -1 ||
    description.indexOf('metal') > -1 ||
    description.indexOf('Radiohead') > -1 ||
    description.indexOf('rock') > -1;

  return isRock;
};
*/
}

interface BandNameProps {
  band: any;
  bandCount: any;
  clash: boolean;
}

const BandName: React.FC<BandNameProps> = ({
  band,
  bandCount,
  clash,
}: BandNameProps) => {
  const newName = band.artist.name.trim().toLowerCase().replace(' ', '-');
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontWeight: 'bold',
        fontSize: '1vw',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}
      >
        {bandCount[newName] > 1 ? <RepeatIcon /> : <NoRepeatIcon />}

        {/*
        {isShit(band.artist.genres, band.artist.description) && <PoopIcon />}
        {isGoodVenue(band.artist.events.venue) && <VenueIcon />}
        */}
        {clash && <ClashIcon />}
      </div>
      {`${band.artist.name}`}
    </div>
  );
};
const Poster: React.FC<PosterProps> = ({ data }: PosterProps) => {
  const [sortedData, setSortedData] = useState<BandData | null>(null);
  const [bandCount, setBandCount] = useState<any | null>(null);
  const [bands, setBands] = useState<{
    wed: React.ReactNode[];
    thu: React.ReactNode[];
    fri: React.ReactNode[];
    sat: React.ReactNode[];
  } | null>(null);

  useEffect(() => {
    const bandCountNew: any = {};
    for (let i = 0; i < data.length; i++) {
      const newName = data[i].artist.name
        .trim()
        .toLowerCase()
        .replace(' ', '-');

      if (!bandCountNew[newName]) {
        bandCountNew[newName] = 1;
      } else {
        bandCountNew[newName] += 1;
      }
    }

    const schedule = (aTime: string, bTime: string, replaceString: string) => {
      const aDateConverted = convertTime12to24(
        aTime
          .replace(replaceString, '')
          .trim()
          .replace('pm', ' pm')
          .replace('am', ' am')
      );
      const aDate = new Date(`${aDateConverted.date} ${aDateConverted.time}`);

      const bDateConverted = convertTime12to24(
        bTime
          .replace(replaceString, '')
          .trim()
          .replace('pm', ' pm')
          .replace('am', ' am')
      );
      const bDate = new Date(`${bDateConverted.date} ${bDateConverted.time}`);
      return { aDate: aDate, bDate: bDate };
    };

    const bandData: BandData = {
      wed: data
        .filter((item) => item.artist.events.time.indexOf('Wed') > -1)
        .sort((a: any, b: any) => {
          const { aDate, bDate } = schedule(
            a.artist.events.time,
            b.artist.events.time,
            'Wednesday'
          );
          return aDate > bDate ? -1 : 1;
        }),
      thu: data
        .filter((item) => item.artist.events.time.indexOf('Thu') > -1)
        .sort((a: any, b: any) => {
          const { aDate, bDate } = schedule(
            a.artist.events.time,
            b.artist.events.time,
            'Thursday'
          );
          return aDate > bDate ? -1 : 1;
        }),
      fri: data
        .filter((item) => item.artist.events.time.indexOf('Fri') > -1)
        .sort((a: any, b: any) => {
          const { aDate, bDate } = schedule(
            a.artist.events.time,
            b.artist.events.time,
            'Friday'
          );
          return aDate > bDate ? -1 : 1;
        }),
      sat: data
        .filter((item) => item.artist.events.time.indexOf('Sat') > -1)
        .sort((a: any, b: any) => {
          const { aDate, bDate } = schedule(
            a.artist.events.time,
            b.artist.events.time,
            'Saturday'
          );
          return aDate > bDate ? -1 : 1;
        }),
    };
    setBandCount(bandCountNew);
    setSortedData(bandData);
  }, [data]);

  const BandElement = (props: {
    index: number;
    band: any;
    day: string;
    clash?: boolean;
  }) => {
    const { index, band, day, clash } = props;
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: index % 2 ? 'rgba(0,0,0,0.7)' : 'rgba(0,0,0,0.5)',
          color: '#fff',
          padding: 4,
        }}
      >
        <BandName band={band} bandCount={bandCount} clash={clash || false} />
        <sub style={{ textAlign: 'right', color: 'rgba(255,255,255,0.7)' }}>{`${
          band.artist.events.venue
        } - ${band.artist.events.time.replace(day, '')}`}</sub>
      </div>
    );
  };
  useEffect(() => {
    if (!sortedData) return;

    async function getDates(sortedData: any) {
      async function wedArr(showNumber: any) {
        return sortedData['wed'].map((band: any, index: number) => {
          const prevBand = sortedData['wed'][index - 1] || null;
          const nextBand = sortedData['wed'][index + 1] || null;
          let hasClash = false;
          if (prevBand) {
            hasClash = prevBand.artist.events.time === band.artist.events.time;
          }
          if (nextBand && !hasClash) {
            hasClash = nextBand.artist.events.time === band.artist.events.time;
          }

          const newName = band.artist.name
            .trim()
            .toLowerCase()
            .replace(' ', '-');

          if (!showNumber[newName]) {
            showNumber[newName] = 1;
          } else {
            showNumber[newName] += 1;
          }

          return (
            <BandElement
              band={band}
              index={index}
              day="Wednesday"
              clash={hasClash}
            />
          );
        });
      }

      async function thuArr(showNumber: any) {
        return sortedData['thu'].map((band: any, index: number) => {
          const prevBand = sortedData['thu'][index - 1] || null;
          const nextBand = sortedData['thu'][index + 1] || null;
          let hasClash = false;
          if (prevBand) {
            hasClash = prevBand.artist.events.time === band.artist.events.time;
          }
          if (nextBand && !hasClash) {
            hasClash = nextBand.artist.events.time === band.artist.events.time;
          }
          const newName = band.artist.name
            .trim()
            .toLowerCase()
            .replace(' ', '-');

          if (!showNumber[newName]) {
            showNumber[newName] = 1;
          } else {
            showNumber[newName] += 1;
          }
          return (
            <BandElement
              band={band}
              index={index}
              day="Thursday"
              clash={hasClash}
            />
          );
        });
      }

      async function friArr(showNumber: any) {
        const showsToday: any = {};

        return sortedData['fri'].map((band: any, index: number) => {
          const prevBand = sortedData['fri'][index - 1] || null;
          const nextBand = sortedData['fri'][index + 1] || null;
          let hasClash = false;
          if (prevBand) {
            hasClash = prevBand.artist.events.time === band.artist.events.time;
          }
          if (nextBand && !hasClash) {
            hasClash = nextBand.artist.events.time === band.artist.events.time;
          }

          const newName = band.artist.name
            .trim()
            .toLowerCase()
            .replace(' ', '-');

          const howManyShowsToday = (bandName: any) => {
            return sortedData['fri'].filter((item: any) => {
              return item.artist.name === bandName.artist.name;
            });
          };

          if (!showNumber[newName]) {
            showNumber[newName] = 1;
          }

          if (!showsToday[newName]) {
            showsToday[newName] = 1;
          }

          const totalShows = bandCount[newName];
          console.log(
            band.artist.name,
            howManyShowsToday(band).length,
            showNumber[newName],
            totalShows,
            totalShows - howManyShowsToday(band).length
          );

          const isLastChance =
            showsToday[newName] === 1 &&
            totalShows - howManyShowsToday(band).length === 0;

          showNumber[newName] += 1;
          showsToday[newName] += 1;

          return (
            <BandElement
              band={band}
              index={index}
              day="Friday"
              clash={hasClash}
            />
          );
        });
      }

      async function satArr(showNumber: any) {
        return sortedData['sat'].map((band: any, index: number) => {
          const prevBand = sortedData['sat'][index - 1] || null;
          const nextBand = sortedData['sat'][index + 1] || null;
          let hasClash = false;
          if (prevBand) {
            hasClash = prevBand.artist.events.time === band.artist.events.time;
          }
          if (nextBand && !hasClash) {
            hasClash = nextBand.artist.events.time === band.artist.events.time;
          }
          const newName = band.artist.name
            .trim()
            .toLowerCase()
            .replace(' ', '-');

          if (!showNumber[newName]) {
            showNumber[newName] = 1;
          } else {
            showNumber[newName] += 1;
          }
          return (
            <BandElement
              band={band}
              index={index}
              day="Saturday"
              clash={hasClash}
            />
          );
        });
      }
      const showNumber: any = {};
      setBands({
        wed: await wedArr(showNumber),
        thu: await thuArr(showNumber),
        fri: await friArr(showNumber),
        sat: await satArr(showNumber),
      });
    }
    getDates(sortedData);
  }, [sortedData]);

  return (
    <div className="poster-page-wrapper">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          position: 'fixed',
          height: '100vh',
          width: '100vw',
        }}
      >
        <img src={tge} className="tge-logo" />
      </div>

      <div className="poster-page">
        <div style={{ width: '22%' }}>
          <h1>Wed</h1>
          {bands?.wed}
        </div>
        <div style={{ width: '22%' }}>
          <h1>Thu</h1>
          {bands?.thu}
        </div>
        <div style={{ width: '22%' }}>
          <h1>Fri</h1>
          {bands?.fri}
        </div>
        <div style={{ width: '22%' }}>
          <h1>Sat</h1>
          {bands?.sat}
        </div>
      </div>
    </div>
  );
};

export default Poster;
