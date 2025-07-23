"use client";

import {
    Button,
    TextField,
    Container,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add"; 
import { useEffect, useState } from "react";

interface Videogame {
    id: number;
    name: string;
    price: number;
    stock: number;
    genre: string;
    release_year: number;
}
export default function UniversitysHome() {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [videogames, setvideogames] = useState<Videogame[]>([]);

    const fetchVideogames = async () => {
          try {
    const response = await fetch(`/api/videogames`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    setvideogames(json);
    console.log(json);
  } catch (err: any) {
    setError(err.message || "Error fetching Universities");
  } finally {
    setLoading(false);
  }
    };
    useEffect(() => {
        fetchVideogames();
      }, []);
    return (
        <Container maxWidth="lg" className="mt-4">
                <Paper elevation={3} className="overflow-x-auto">
                    <Table>
                        <TableHead className="bg-gray-200">
                            <TableRow>
                              <TableCell> ID </TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Possible gains</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell>Year of publishing</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {videogames.map((videogame) => (
                                <TableRow key={videogame.id}>
                                  <TableCell>{videogame.id}</TableCell>
                                    <TableCell>{videogame.name}</TableCell>
                                    <TableCell>{videogame.price}</TableCell>
                                    <TableCell>{videogame.stock}</TableCell>
                                    <TableCell>{(videogame.price * videogame.stock).toFixed(2)}</TableCell>
                                    <TableCell>{videogame.genre}</TableCell>
                                    <TableCell>{videogame.release_year}</TableCell>
                                      </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
        </Container>
    );
}
