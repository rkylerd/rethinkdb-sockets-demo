import styled from "styled-components";
import { AlbumArtwork as GenericAlbumArtwork, NameAndArtist as GenericNameAndArtist } from "../tags";

export const AlbumArtwork = styled(GenericAlbumArtwork)`
    margin: 0 auto;
    box-shadow: black 0 1px 3px;
`;

export const NameAndArtist = styled(GenericNameAndArtist)`
    width: 100%;
`;

const Arrow = styled.div`
    width: 0; 
    height: 0; 
    cursor: pointer;
`;

export const ArrowUp = styled(Arrow)`
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-bottom: 15px solid #8FBC8F;
`;

export const ArrowDown = styled(Arrow)`
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    border-top: 15px solid #F08080;
`;