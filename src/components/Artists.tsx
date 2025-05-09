import React, { useEffect } from 'react';

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
  const generateComponent = (response: any[]) => {
    const componentArray = [];
    for (let i = 0; i < response.length; i++) {
      const item = response[i];
      const isShit =
        item.artist.genres.join(',').indexOf('nu jazz') > -1 ||
        item.artist.genres.join(',').indexOf('garage') > -1 ||
        item.artist.genres.join(',').indexOf('shoegaze') > -1 ||
        item.artist.genres.join(',').indexOf('grime') > -1 ||
        item.artist.genres.join(',').indexOf('spoken') > -1 ||
        item.artist.genres.join(',').indexOf('bedroom') > -1 ||
        item.artist.genres.join(',').indexOf('house') > -1;

      const isRock =
        item.artist.genres.join(',').indexOf('punk') > -1 ||
        item.artist.genres.join(',').indexOf('celtic') > -1 ||
        item.artist.genres.join(',').indexOf('metal') > -1 ||
        item.artist.genres.join(',').indexOf('rock') > -1;
      componentArray.push(
        <div
          style={{
            backgroundImage: `url(${item.artist.image.url})`,
            backgroundSize: 'cover',
            width: 200,
            height: 200,
            margin: 10,
            borderRadius: 10,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: 20,
            position: 'relative',
            overflow: 'hidden',
            filter: isShit ? '' : isRock ? '' : 'grayscale(100%)',
            opacity: isShit ? '' : isRock ? '' : '0.5',
            boxShadow: isShit
              ? 'inset 10px 10px 10px rgba(0,0,0,0.5)'
              : isRock
              ? '10px 10px 10px rgba(0,0,0,0.5)'
              : '',
            border: isShit
              ? '3px solid rgba(112, 66, 45, 1)'
              : isRock
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
              backgroundColor: isShit
                ? 'rgba(112, 66, 45, 0.5)'
                : isRock
                ? 'rgba(255, 133, 241, 0.5)'
                : 'rgba(0, 0, 0, 0.5)',
            }}
          >
            {item.artist.name}
          </div>
          {isRock && (
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                position: 'absolute',
                bottom: 10,
                right: 10,
                zIndex: 1,
                borderRadius: '50%',
                border: '1px solid white',
                height: 32,
                width: 32,
                background: '#ff85a9',
                display: 'flex',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              🤘
            </div>
          )}
          {isShit && (
            <div
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                position: 'absolute',
                bottom: 10,
                right: 10,
                zIndex: 1,
                borderRadius: '50%',
                border: '1px solid white',
                height: 32,
                width: 32,
                background: '#dea152',
              }}
            >
              💩
            </div>
          )}

          <div
            style={{
              backdropFilter: 'blur(5px)',
              height: '60%',
              overflow: 'auto',
              backgroundColor: isShit
                ? 'rgba(112, 66, 45, 0.5)'
                : isRock
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
          </div>
        </div>
      );
    }
    return componentArray;
  };
  return (
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
        position: 'fixed',
        overflow: 'auto',
      }}
    >
      {generateComponent(response)}
    </div>
  );
};

export default Artists;
