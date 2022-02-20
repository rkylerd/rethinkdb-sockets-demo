import React, { FC, ReactNode, useContext } from 'react'
import { FlexContainer, Wrapper } from './tags';
import { Song } from '../../types/song';
import SoundPlayerContext from '../../contexts/soundPlayer';
import { playSound } from '../../utils/sounds';
import SongCard from './Card';

export type SongDisplayProps = {
    song: Song;
    setPlaying: (song: Song, soundData: HTMLDivElement & EventTarget) => void;
    isPlaying: boolean;
    extraContentRenderer?: (song: Song) => ReactNode;
};

type SongListProps = {
    songs: Song[];
    extraContentRenderer?: SongDisplayProps["extraContentRenderer"];
};

const SongList: FC<SongListProps> = ({ songs, extraContentRenderer }) => {
    const { soundData, setSoundData } = useContext(SoundPlayerContext);
    const { isPlaying, song: { trackId: idOfPlaying = null } = {} } = soundData;

    const setPlaying = playSound(soundData, setSoundData);

    return <Wrapper>
        <FlexContainer withColumns={false}>
            {songs.map(song => (
                <SongCard
                    key={song.trackId}
                    song={song}
                    isPlaying={isPlaying && song.trackId === idOfPlaying}
                    extraContentRenderer={extraContentRenderer}
                    setPlaying={setPlaying} />
            ))}
        </FlexContainer>
    </Wrapper>
};

export default SongList;