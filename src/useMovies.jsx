import { useState, useEffect } from "react";

const KEY = "b2d20d5f";

export function useMovies(query) {
  const [movies, setMovies] = useState([]); //prop drilling. tem que ser passado lá pro MovieList
  const [isLoading, setIsLoading] = useState(false); //state para um componente loading. colocado como false(nao há necessidade de aparecer loading no começo)
  const [error, setError] = useState(""); //state pare erros
  useEffect(
    function () {
      //   callback?.();
      //para usar async functions no react, tem que incluir a propria numa function dentro do useeffect
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          //try block(junto com o catch). caso nao haja erros, o que vai ser executado é o setLoading pra true, a response vai buscar os dados da api
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            //se não estiver ok, lançar mensagem de error
            throw new Error("Something went wrong with fetching movies ");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie not found");
          setMovies(data.Search); //se a response for falsa/ undefined, entao colocar que o filme nao foi encontrado
          setError("");
        } catch (err) {
          //se houver um error, entao
          console.log(err.message); //mensagem de erro no console
          if (err.name !== "AbortError") {
            setError(err.message);
          }
          setError(err.message); //state de error, alterando entre a mensagem de error do filme nao encontrando ou o algum problema na busca da api
        } finally {
          setIsLoading(false); //set de loading mudando pra false caso esteja tudo certo
        }
      }
      if (query.length < 3) {
        //se a query for menor que 3 nem compensa buscar
        setMovies([]); //entao, mudar o state pra array vazia
        setError(""); //sem mensagem de erro
        return;
      }
      //   handleCloseMovie();
      fetchMovies();
      //nunca definir state dentro do fetch sem estar no useEffect. vai fazer milhoes de requests.
      // queremos que a função seja executada nao quando o componente for re-renderizado, mas sim quando for colocado na tela pela primeira vez
      //res = response

      //**quando usar uma api por http request, sempre fazer a clean up function e o abort controller**
      return function () {
        controller.abort;
      };
    },
    [query]
  );
  return { movies, isLoading, error };
}
