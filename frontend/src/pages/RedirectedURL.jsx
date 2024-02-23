import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const RedirectedURL = () => {
  const { shortId } = useParams();
  const navigate = useNavigate();

  const newLink = async () => {
    try {
      const res = await axios.get(`/u/${shortId}`);
      console.log(res.data);
      if (res.data.message == "OK") {
        console.log(res.data.redirectURL);
        navigate(res.data.redirectURL);
      }
    } catch (e) {
      console.log(e);
      toast.error(e);
    }
  };
  useEffect(() => {
    newLink();
  }, []);
  return null;
};
export default RedirectedURL;
