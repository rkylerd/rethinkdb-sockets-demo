import { faBackward, faCaretLeft, faCaretRight, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { ChangeEventHandler, FC, useContext, useState } from 'react'
import SoundPlayerContext from '../../contexts/soundPlayer';
import { Song } from '../../types/song';
import { millisToMinutesAndSeconds, playSound } from '../../utils/sounds';
import Icon from '../Icon';
import Options from '../Options';
import { FlexContainer, MusicPlayer, MusicPlayerWrapper } from './tags';

const GlobalSoundPlayer: FC = (): JSX.Element | null => {

    const { soundData, setSoundData } = useContext(SoundPlayerContext);
    const [isHidden, setIsPlayerHidden] = useState<boolean>(false);

    const updateTimeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
        const { currentTarget: { value = '0' } = {} } = e;
        soundData.soundPlayer && (soundData.soundPlayer.currentTime = parseInt(value));
    };

    const playNext = () => {
        const nextSong = soundData.upNextQueue?.[0];
        const newSoundData = {
            ...soundData,
            upNextQueue: soundData.upNextQueue.slice(1),
        };
        setSoundData(newSoundData);
        playSound(newSoundData, setSoundData)(nextSong);
    };

    return soundData.song ? (
        <MusicPlayerWrapper className={isHidden ? "hidden" : ""}>
            <MusicPlayer >
                <div id="caret">
                    <Icon icon={isHidden ? faCaretLeft : faCaretRight} onClick={() => setIsPlayerHidden(!isHidden)} />
                </div >
                <FlexContainer>
                    <Options
                        insideStaticContainer={true}
                        OptionsDisplayElement={
                            <img src={soundData.song?.artworkUrl30 || ""} alt="Album artwork of song that's playing" style={{ margin: "auto", boxShadow: "black 0px 1px 3px" }} />
                        }>
                        {[soundData.song, ...soundData.upNextQueue].map(({ trackName }: Song, idx) => <li key={trackName + idx}>
                            {trackName}
                        </li>)}
                    </Options>
                </FlexContainer>
                <FlexContainer id="buttons">
                    <div>
                        {/* @ts-ignore - the destructuring and default value of '0' gets around the type mismatch */}
                        <Icon color={"#292b2c"} icon={faBackward} onClick={updateTimeHandler} />
                    </div>
                    <div>
                        <Icon color={"#292b2c"} icon={soundData.isPlaying ? faPause : faPlay} onClick={() => {
                            if (!soundData.soundPlayer) return;

                            if (soundData.isPlaying) {
                                soundData.soundPlayer?.pause()
                            } else {
                                soundData.soundPlayer?.play()
                            }
                            setSoundData(prev => ({ ...prev, isPlaying: !prev.isPlaying }))
                        }} />
                    </div>

                    <div>
                        <Icon color="#292b2c" icon={faForward} onClick={playNext} />
                    </div>
                </FlexContainer >
                <div id="slider">
                    <span>
                        {millisToMinutesAndSeconds((soundData?.currentTimeOfSong || 0) * 1000).timeStr}
                    </span>
                    <input
                        type="range"
                        min={0}
                        onChange={updateTimeHandler}
                        value={soundData?.currentTimeOfSong || 0}
                        max={30} />
                    <span>
                        {"0:30"}
                    </span>
                </div>
            </MusicPlayer >
        </MusicPlayerWrapper>
    ) : null;
};

export default GlobalSoundPlayer;