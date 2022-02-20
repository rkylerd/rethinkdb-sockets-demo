import React, { FC, useState } from 'react'
import { Card, PlayingIndicator } from '../tags';
import { AlbumArtwork, NameAndArtist } from './tags';
import { SongDisplayProps } from '..';


const SongCard: FC<SongDisplayProps> = ({ song, setPlaying, isPlaying, extraContentRenderer = (() => <></>) }) => {
    const { artworkUrl60, trackName, artistName } = song;
    const [isHovered, setHovered] = useState<boolean>(false);

    return (
        <Card>
            <div style={{ display: 'flex' }}>
                <AlbumArtwork
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                    onBlur={() => setHovered(false)}
                    onFocus={() => setHovered(true)}
                    tabIndex={1}
                    onKeyPress={(e) => e.currentTarget.click()}
                    isPlaying={isPlaying}
                    isHovered={isHovered}
                    artwork={artworkUrl60}
                    onClick={({ currentTarget }) => setPlaying(song, currentTarget)}>
                    <PlayingIndicator />
                </AlbumArtwork>

                <div style={{ width: '100%' }}>
                    {extraContentRenderer(song)}
                </div>
            </div>

            <NameAndArtist>
                <span><strong>{trackName}</strong></span>
                <span >{artistName}</span>
            </NameAndArtist>
        </Card >
    )
}

export default SongCard;