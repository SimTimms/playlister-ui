import React, { useEffect } from 'react';
import parse from 'html-react-parser';
import Poster from './Poster';
import magic from '../assets/magic.gif';
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
    return (
      <div>
        <img src={magic} />
      </div>
    );
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
          className="div-ew"
          style={{
            backgroundImage: `url(${item.artist.image.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
          }}
        >
          <div
            className="div-ew"
            style={{
              backdropFilter: 'blur(5px)',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingBottom: 20,
              width: '100%',
              position: 'absolute',
              bottom: 0,
              left: 0,
              overflow: 'auto',
              paddingTop: 50,
            }}
          >
            <h2>{item.artist.name}</h2>
            {filterArray.map((itemA) => {
              return (
                <div>
                  {`${itemA.artist.events.venue} - ${itemA.artist.events.time}`}
                </div>
              );
            })}
            <div style={{ margin: 10 }}></div>
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
                padding: 10,
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
        className="div-ew"
        style={{
          display: 'flex',
          width: '100vw',

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
        <img src={magic} />
      </div>
    );
  }
  return (
    <div
      className="div-ew"
      style={{
        display: 'flex',
        width: '100vw',
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
                changePlaylist('5syAOZdtRs7vk82rzYfq1R');
              }}
              style={{
                opacity: playlistId === '5syAOZdtRs7vk82rzYfq1R' ? 1 : 0.4,
              }}
            >
              Ed
            </button>
            <button
              onClick={() => {
                changePlaylist('3o60YYFMgopRPOXOYxpkTz');
              }}
              style={{
                opacity: playlistId === '3o60YYFMgopRPOXOYxpkTz' ? 1 : 0.4,
              }}
            >
              Tim
            </button>
            <button
              onClick={() => {
                changePlaylist('3g2AIxdNdLLcWHVOuVxBXg');
              }}
              style={{
                opacity: playlistId === '3g2AIxdNdLLcWHVOuVxBXg' ? 1 : 0.4,
              }}
            >
              Yak
            </button>
            <button
              onClick={() => {
                changePlaylist('4z56A77P0onHJOgItRGR2W');
              }}
              style={{
                opacity: playlistId === '4z56A77P0onHJOgItRGR2W' ? 1 : 0.4,
              }}
            >
              Luk
            </button>
            <button
              onClick={() => {
                changePlaylist('3V1tvYLZ8TodrWzJukaZzL');
              }}
              style={{
                opacity: playlistId === '3V1tvYLZ8TodrWzJukaZzL' ? 1 : 0.4,
              }}
            >
              Phi
            </button>
            <button
              onClick={() => {
                changePlaylist('3gS4Gq1iv442Dp8NPkS888');
              }}
              style={{
                opacity: playlistId === '3gS4Gq1iv442Dp8NPkS888' ? 1 : 0.4,
              }}
            >
              John
            </button>
            <button
              onClick={() => {
                changePlaylist('7gobrIxFHBcPKlZfRYRBN1');
              }}
              style={{
                opacity: playlistId === '7gobrIxFHBcPKlZfRYRBN1' ? 1 : 0.4,
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
        className="div-ew"
        style={{
          display: 'flex',
          width: '100vw',
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
