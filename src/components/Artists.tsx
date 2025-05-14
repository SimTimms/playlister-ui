import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import Poster from './Poster';
const Artists: React.FC = () => {
  const [playlistId, setPlaylistId] = React.useState<string>(
    '3o60YYFMgopRPOXOYxpkTz'
  );
  const [response, setResponse] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [currentArtist, setCurrentArtist] = React.useState<any>(null);
  const [showPanels, setShowPanels] = React.useState<boolean>(true);

  const changePlaylist = (newPlaylist: string) => {
    setCurrentArtist(null);
    setPlaylistId(newPlaylist);
  };
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/${playlistId}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = await res.json();
        setResponse(data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [playlistId]);

  if (!response) {
    return <div>Loading...</div>;
  }

  const generateComponent = (response: any[]) => {
    const componentArray = [];
    let filterArray = response;
    if (currentArtist) {
      filterArray = response.filter(
        (item) => item.artist.name === currentArtist.artist.name
      );
    }
    for (let i = 0; i < [filterArray[0]].length; i++) {
      const item = filterArray[i];

      componentArray.push(
        <div
          style={{
            backgroundImage: `url(${item.artist.image.url})`,
            backgroundSize: 'cover',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <div
            style={{
              backdropFilter: 'blur(5px)',
              overflow: 'auto',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingBottom: 20,
              width: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0,
            }}
          >
            <h2>{item.artist.name}</h2>
            {item.tracks.slice(0, 5).map((track: any) => {
              const trackSplit = track.split('|');
              return (
                <a
                  style={{
                    fontSize: 12,
                    color: 'white',
                    lineHeight: 1,
                    cursor: 'pointer',
                    fontWeight: 'normal',
                    background: 'black',
                    padding: 10,
                    margin: 3,
                    borderRadius: 10,
                    width: '80%',
                  }}
                  href={trackSplit[1]}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {`🔈 ${trackSplit[0]}`}
                </a>
              );
            })}

            <div
              style={{
                marginTop: 10,
                overflow: 'auto',
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

  const changeArtist = (artist: any) => {
    setCurrentArtist(artist);
    setShowPanels(false);
  };

  if (loading) {
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
          background: 'gray',
        }}
      >
        LOADING!!!!
      </div>
    );
  }
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
        background: 'gray',
        overflow: 'auto',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100vw',
          flexWrap: 'wrap',
        }}
      >
        {showPanels && (
          <>
            <button
              onClick={() => {
                changePlaylist('3o60YYFMgopRPOXOYxpkTz');
              }}
            >
              Tim
            </button>
            <button
              onClick={() => {
                changePlaylist('3g2AIxdNdLLcWHVOuVxBXg');
              }}
            >
              Yak
            </button>
            <button
              onClick={() => {
                changePlaylist('4z56A77P0onHJOgItRGR2W');
              }}
            >
              Luk
            </button>
            <button
              onClick={() => {
                changePlaylist('3V1tvYLZ8TodrWzJukaZzL');
              }}
            >
              Phi
            </button>
            <button
              onClick={() => {
                changePlaylist('3gS4Gq1iv442Dp8NPkS888');
              }}
            >
              John
            </button>
            <button
              onClick={() => {
                changePlaylist('7gobrIxFHBcPKlZfRYRBN1');
              }}
            >
              Bean
            </button>
          </>
        )}
        {!showPanels && (
          <button
            onClick={() => {
              setShowPanels((showPanels) => !showPanels);
            }}
            style={{ fontSize: 10 }}
          >
            ❌
          </button>
        )}
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
        }}
      >
        {generateComponent(response)}
      </div>
      {showPanels && <Poster data={response} setCurrentArtist={changeArtist} />}
    </div>
  );
};

export default Artists;
