import { useEffect, useRef, useState } from "react";
import Cookies from "universal-cookie";
const useGetFetch = (url:string)=> {
  const [data, setdata] = useState<any>(null);
  const [IsPending, setIsPending] = useState(false);
  const [err, seterr] = useState<any>(null);
  const abortCont = useRef<AbortController>();
  const ok = useRef(true);
  const cookies=new Cookies();

  useEffect(() => {
    abortCont.current = new AbortController();
     setIsPending(true);
     seterr(null);
     const target_url = process.env.NEXT_PUBLIC_SERVERURL + url;
     if (abortCont.current) {
       fetch(target_url, {
         method: "GET",
         headers: {
           Authorization:"bearer "+ cookies.get("jwt") || "",
         },
         credentials: "include",
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
    return () => {
      abortCont.current && abortCont.current.abort();
    };
  }, []);


  return { data, IsPending, err };
};

export default useGetFetch;
