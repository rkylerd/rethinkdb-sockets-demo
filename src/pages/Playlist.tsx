import React, { useContext } from 'react';
import axios from 'axios';
import Options from '../components/Options';
import SongList from '../components/SongList';
import { ArrowDown, ArrowUp } from '../components/SongList/Card/tags';
import { ExplicitContainer } from '../components/SongList/tags';
import SoundPlayerContext from '../contexts/soundPlayer';
import { Song } from '../types/song';
import PlaylistContext from '../contexts/playlist';

const voteSorter = (a: Song, b: Song) => (
    a.votes === b.votes
        ? 0
        : (a.votes || 0) > (b.votes || 0)
            ? -1
            : 1
);

const Playlist = () => {
    const { setSoundData } = useContext(SoundPlayerContext);
    const { playlist, loading } = useContext(PlaylistContext);

    const deleteFromPlaylist = async (trackId: number) => {
        try {
            await axios.delete(`api/playlist/${trackId}`);
        } catch (err) {
            console.log("whoops. Delete failed.");
        }
    };

    const vote = (direction: "up" | "down") => (trackId: number) => async () => {
        try {
            await axios.patch(`api/playlist/${trackId}/vote?direction=${direction}`);
        } catch (err) {
            console.log("whoops. Check out that vote function");
        }
    };

    const upVote = vote("up");
    const downVote = vote("down");

    const addToUpNextQueue = (song: Song) =>
        setSoundData(prev => ({
            ...prev,
            upNextQueue: [...prev.upNextQueue, song],
        }));

    return (
        <div>
            <h1>Playlist</h1>

            {loading ? <h4>loading your tunes...</h4> :
                <SongList songs={playlist.sort(voteSorter)} extraContentRenderer={(song) => {
                    return (<>
                        <Options style={{ marginLeft: 'auto' }}>
                            <li tabIndex={1} onKeyPress={(e) => e.currentTarget.click()} onClick={() => addToUpNextQueue(song)}>Add to Up Next</li>
                            <li tabIndex={1} onKeyPress={(e) => e.currentTarget.click()} onClick={() => deleteFromPlaylist(song.trackId)}>Remove from playlist</li>
                        </Options>
                        <span style={{ margin: 'auto', textAlign: 'center' }}>
                            {song.trackExplicitness === 'explicit' && <ExplicitContainer>E</ExplicitContainer>}
                        </span>
                        <div style={{ display: 'flex', flexDirection: "column", alignItems: "center" }}>
                            <ArrowUp onClick={upVote(song.trackId)} />
                            {song.votes}
                            <ArrowDown onClick={downVote(song.trackId)} />
                        </div>
                    </>)
                }} />
            }

        </div>
    );
};

export default Playlist;