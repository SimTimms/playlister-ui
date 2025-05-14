import React, { useEffect } from 'react';
import { PoopIcon } from './PoopIcon';
import { RockIcon } from './RockIcon';
import { VenueIcon } from './VenueIcon';
import parse from 'html-react-parser';
import Poster from './Poster';
const Artists: React.FC = () => {
  const [response, setResponse] = React.useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(import.meta.env.VITE_API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        setResponse(data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!response) {
    return <div>Loading...</div>;
  }

  const isShit = (
    genre: string[],
    popularity: number,
    description: string
  ): boolean => {
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
      description.indexOf('emotional reflection') > -1 ||
      description.indexOf('shoegaze') > -1;

    return isShit;
  };

  const isShitVenue = (venue: string): boolean => {
    if (!venue) {
      return false;
    }
    const isShit: boolean = venue.indexOf('Prasdince Albert') > -1;
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

  const isRock = (
    genre: string[],
    popularity: number,
    description: string
  ): boolean => {
    if (!genre) {
      return false;
    }
    const isRock: boolean =
      genre.join(',').indexOf('punk') > -1 ||
      genre.join(',').indexOf('celtic') > -1 ||
      genre.join(',').indexOf('metal') > -1 ||
      genre.join(',').indexOf('rock') > -1 ||
      popularity > 50 ||
      description.indexOf('punk') > -1 ||
      description.indexOf('metal') > -1 ||
      description.indexOf('Radiohead') > -1 ||
      description.indexOf('rock') > -1;

    return isRock;
  };

  const poopCount = () => {
    let poopCount = 0;
    let rockCount = 0;
    let venueCount = 0;
    for (let i = 0; i < response.length; i++) {
      const item = response[i];
      if (
        isShit(
          item.artist.genres,
          item.artist.popularity,
          item.artist.description
        )
      ) {
        poopCount++;
      } else {
        if (
          isRock(
            item.artist.genres,
            item.artist.popularity,
            item.artist.description
          )
        ) {
          rockCount++;
        }
      }
      if (isGoodVenue(item.artist.events.venue)) {
        venueCount++;
      }
    }
    return [poopCount, rockCount, venueCount];
  };

  const generateComponent = (response: any[]) => {
    const componentArray = [];
    for (let i = 0; i < response.length; i++) {
      const item = response[i];

      const isThisShit = isShit(
        item.artist.genres,
        item.artist.popularity,
        item.artist.description
      );

      let isThisRock = false;

      if (!isThisShit) {
        isThisRock = isRock(
          item.artist.genres,
          item.artist.popularity,
          item.artist.description
        );
      }
      componentArray.push(
        <div
          style={{
            backgroundImage: `url(${item.artist.image.url})`,
            backgroundSize: 'cover',
            width: 300,
            minHeight: 300,
            margin: 10,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: 20,
            position: 'relative',
            overflow: 'hidden',
            filter: isThisShit ? '' : isThisRock ? '' : 'grayscale(0%)',
            opacity: isThisShit ? '' : isThisRock ? '' : '0.5',
            boxShadow: isThisShit
              ? 'inset 10px 10px 10px rgba(0,0,0,0.5)'
              : isThisRock
              ? '10px 10px 10px rgba(0,0,0,0.5)'
              : '',
            border: isThisShit
              ? '3px solid rgba(112, 66, 45, 1)'
              : isThisRock
              ? '3px solid rgba(255,255,255, 0.5)'
              : '3px solid rgba(0, 0, 0, 0.5)',
          }}
        >
          <div
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              zIndex: 1,
              backdropFilter: 'blur(10px)',
              backgroundColor: isThisShit
                ? 'rgba(112, 66, 45, 0.5)'
                : isThisRock
                ? 'rgba(255, 133, 241, 0.5)'
                : 'rgba(0, 0, 0, 0.5)',
            }}
          >
            {item.artist.name}
          </div>
          {isThisRock && (
            <div
              style={{
                fontWeight: 'bold',
                position: 'absolute',
                bottom: 4,
                right: 4,
                zIndex: 1,
              }}
            >
              <RockIcon />
            </div>
          )}
          {isThisShit && (
            <div
              style={{
                fontWeight: 'bold',
                position: 'absolute',
                bottom: 4,
                right: 4,
                zIndex: 1,
              }}
            >
              <PoopIcon />
            </div>
          )}
          {isShitVenue(item.artist.events.venue) && (
            <div
              style={{
                fontWeight: 'bold',
                position: 'absolute',
                bottom: 4,
                left: 4,
                zIndex: 1,
              }}
            >
              <PoopIcon />
            </div>
          )}
          {isGoodVenue(item.artist.events.venue) && (
            <div
              style={{
                fontWeight: 'bold',
                position: 'absolute',
                bottom: 4,
                left: 4,
                zIndex: 1,
              }}
            >
              <VenueIcon />
            </div>
          )}

          <div
            style={{
              backdropFilter: 'blur(5px)',
              overflow: 'auto',
              backgroundColor: isThisShit
                ? 'rgba(112, 66, 45, 0.5)'
                : isRock(
                    item.artist.genres,
                    item.artist.popularity,
                    item.artist.description
                  )
                ? 'rgba(255, 133, 241, 0.5)'
                : 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 10,
              width: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}
          >
            {item.tracks.slice(0, 5).map((track: any) => {
              const trackSplit = track.split('|');
              return (
                <a
                  style={{
                    fontSize: 12,
                    margin: 0,
                    padding: 1,
                    color: 'white',
                    lineHeight: 1,
                    cursor: 'pointer',
                    fontWeight: 'normal',
                  }}
                  href={trackSplit[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {trackSplit[0]}
                </a>
              );
            })}
            <div style={{ fontSize: 10, marginTop: 10 }}>
              {item.artist.genres.join(' | ')}
              <br />
              {`${item.artist.events.venue.replace('&#8211;', '@')} - ${
                item.artist.events.time
              }`}
              <br />
              {item.artist.popularity}
            </div>
            <div
              style={{
                fontSize: 10,
                marginTop: 10,
                overflow: 'auto',
                height: 60,
              }}
            >
              {parse(item.artist.description)}
            </div>
          </div>
        </div>
      );
    }
    return componentArray;
  };

  const generatePoops = (poopCount: number) => {
    const poopArr = [];
    for (let i = 0; i < poopCount; i++) {
      poopArr.push(<PoopIcon />);
    }

    return poopArr;
  };

  const generateRocks = (poopCount: number) => {
    const poopArr = [];
    for (let i = 0; i < poopCount; i++) {
      poopArr.push(<RockIcon />);
    }

    return poopArr;
  };

  const generateVenues = (venueCount: number) => {
    const poopArr = [];
    for (let i = 0; i < venueCount; i++) {
      poopArr.push(<VenueIcon />);
    }

    return poopArr;
  };

  return (
    <div
      style={{
        display: 'flex',
        width: '100vw',
        height: '100vh',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        left: 0,
        top: 0,
        position: 'fixed',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          padding: 10,
          backdropFilter: 'blur(10px)',
          width: '100vw',
          zIndex: 2,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: 10,
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {generatePoops(poopCount()[0])}
          {generateRocks(poopCount()[1])}
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            padding: 10,
            width: '100%',
            flexWrap: 'wrap',
          }}
        >
          {generateVenues(poopCount()[2])}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '100vh',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          left: 0,
          top: 0,
          overflow: 'auto',
          position: 'fixed',
          zIndex: 0,
          paddingTop: 140,
        }}
      >
        {generateComponent(response)}
      </div>
      <Poster data={response} />
    </div>
  );
};

export default Artists;
