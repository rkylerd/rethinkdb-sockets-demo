import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import SongCard from '../components/SongList/Card';
import SoundPlayerContext from '../contexts/soundPlayer';
import { Song } from '../types/song';
import { playSound } from '../utils/sounds';

const Playlist = () => {

    const [playlist, setPlaylist] = useState<Song[]>([]);
    const { soundData, setSoundData } = useContext(SoundPlayerContext);
    const { isPlaying, song: { trackId: idOfPlaying = null } = {} } = soundData;

    useEffect(() => {
        (async () => {
            const playlist = await axios.get(`api/playlist`);
            console.log({ playlist });
        })()
    }, []);

    const setPlaying = playSound(soundData, setSoundData);
    const addToPlayNextQueue = (song: Song) =>
        setSoundData(prev => ({
            ...prev,
            upNextQueue: [...prev.upNextQueue, song],
        }));

    return (
        <div>
            <div className="page-title-container">
                <div className="page-title">Playlist</div>
            </div>
            <section>

                <div className="playlist-normal">
                    {
                        playlist.map((song) => (
                            <SongCard
                                key={song.trackId}
                                song={song}
                                isPlaying={isPlaying && song.trackId === idOfPlaying}
                                addToUpNextQueue={addToPlayNextQueue}
                                setPlaying={setPlaying}
                                withOptions={true} />

                            //     // @add-checkout="addCheckout(song)"
                            //     // @remove-checkout="removeCheckout(song)"
                            //     // draggable="true"
                            //     key={song.trackId}
                            //     // v-on:dragstart="setDragItem(song)"
                            //     // v-on:dragover.prevent v-on:drop="dropItem(song)"
                            //     song={song} />
                        ))
                    }

                </div>
            </section>
        </div>
    )
};

export default Playlist;