import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { io } from 'socket.io-client';
import { Song } from "../types/song";
import axios from "axios";

export const PlaylistContext = createContext<{ playlist: Song[]; loading: boolean; setPlaylist: Dispatch<SetStateAction<Song[]>>; }>({
    playlist: [],
    setPlaylist: () => null,
    loading: false,
});

const socket = io(`http://localhost:3001`);

export const PlaylistProvider: FC = ({ children }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [playlist, setPlaylist] = useState<Song[]>([]);

    const updateVotesCount = (song: Song) => {
        const idxOf = playlist.findIndex(({ trackId }) => trackId === song.trackId);

        if (idxOf >= 0) {
            setPlaylist(prev => [
                ...prev.slice(0, idxOf),
                { ...prev[idxOf], votes: song.votes },
                ...prev.slice(idxOf + 1)
            ]);
        }
    };

    const addSongToPlaylist = (song: Song) => {
        setPlaylist(prev => [
            ...prev,
            song,
        ]);
    };

    const removeSong = (trackId: number) => {
        const idxOf = playlist.findIndex(song => trackId === song.trackId);

        if (idxOf >= 0) {
            setPlaylist(prev => [
                ...prev.slice(0, idxOf),
                ...prev.slice(idxOf + 1)
            ]);
        }
    }

    useEffect(() => {
        (async () => {
            setLoading(true);
            const { data: dbPlaylist } = await axios.get(`api/playlist/`);
            setPlaylist(dbPlaylist);
            setLoading(false);
        })();
    }, []);

    /**
     * Important! When the socket.once is called and callback is assigned,
     * the playlist is state. Meaning, when addSongToPlaylist() or one of the other callbacks
     * is finally called, it might not have the most up-to-date playlist state.
     * For that reason, we should remove all listeners and add them once again
     * each time playlist is updated to ensure each callback is updating and deleting
     * the correct information.
     */
    useEffect(() => {
        socket.removeAllListeners();

        socket.once('Song:created', addSongToPlaylist);
        socket.once('Song:updated', updateVotesCount);
        socket.once('Song:deleted', removeSong);

    }, [playlist]);

    return (
        <PlaylistContext.Provider value={{ playlist, setPlaylist, loading }}>
            {children}
        </PlaylistContext.Provider>
    );
};

export default PlaylistContext;

