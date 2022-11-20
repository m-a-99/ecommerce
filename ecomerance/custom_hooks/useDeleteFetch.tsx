import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
const useDeleteFetch = () => {
  const [data, setdata] = useState<any>(null);
  const [IsPending, setIsPending] = useState(false);
  const [err, seterr] = useState<any>(null);
  const abortCont = useRef<AbortController>();
  const ok = useRef(true);
  const cookies = new Cookies();

  useEffect(() => {
    abortCont.current = new AbortController();
    return () => {
      abortCont.current && abortCont.current.abort();
    };
  }, []);
  function Delete(url: string, body: any) {
    setIsPending(true);
    seterr(null);
    const urll = process.env.NEXT_PUBLIC_SERVERURL + url;
    if (abortCont.current) {
      fetch(urll, {
        method: "DELETE",
        headers: {
          Authorization: "bearer " + cookies.get("jwt") || "",
          // "Content-Type": "application/json",
        },
        credentials: "include",
        body: body,
        signal: abortCont.current.signal,
      })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            ok.current = false;
          } else {
            ok.current = true;
          }

          return res.json();
        })
        .then((d) => {
          if (!ok.current) {
            throw Error(JSON.stringify(d));
          } else {
            setdata(d);
            setIsPending(false);
          }
        })
        .catch((error) => {
          if (error.name === "AbortError") {
            console.log("fetch aborted");
          } else {
            console.log(error.message);
            seterr(JSON.parse(error.message));
            setIsPending(false);
          }
        });
    }
  }

  return { data, IsPending, err, Delete };
};

export default useDeleteFetch;
