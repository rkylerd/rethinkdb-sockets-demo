import React, { FC, useContext } from 'react'
import { FlexContainer, Wrapper } from './tags';
import { Song } from '../../types/song';
import SoundPlayerContext from '../../contexts/soundPlayer';
import { playSound } from '../../utils/sounds';
import SongCard from './Card';

export type SongDisplayProps = {
    song: Song;
    setPlaying: (song: Song, soundData: HTMLDivElement & EventTarget) => void;
    addToUpNextQueue: (song: Song) => void;
    isPlaying: boolean;
    withOptions: boolean;
};

type SongListProps = {
    songs: Song[];
};

const SongList: FC<SongListProps> = ({ songs }) => {
    const { soundData, setSoundData } = useContext(SoundPlayerContext);
    const { isPlaying, song: { trackId: idOfPlaying = null } = {} } = soundData;

    const setPlaying = playSound(soundData, setSoundData);
    const addToPlayNextQueue = (song: Song) =>
        setSoundData(prev => ({
            ...prev,
            upNextQueue: [...prev.upNextQueue, song],
        }));

    return <Wrapper>
        <FlexContainer withColumns={false}>
            {songs.map(song => (
                <SongCard
                    key={song.trackId}
                    song={song}
                    isPlaying={isPlaying && song.trackId === idOfPlaying}
                    addToUpNextQueue={addToPlayNextQueue}
                    setPlaying={setPlaying}
                    withOptions={true} />
            ))}
        </FlexContainer>
    </Wrapper>
};

export default SongList;