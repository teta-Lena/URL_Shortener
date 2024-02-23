import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const validSchema = yup.object().shape({
  url: yup.string().required("The URL is required").url(),
});

const UrlShortening = () => {
  const navigate = useNavigate();
  const [shortUrl, setShortUrl] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(validSchema) });

  const onSubmitHandler = async (urllink, e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/u/generateurl", urllink);
      console.log(res);
      toast.success(res.data.message);
      setShortUrl(res.data.shortId);
    } catch (e) {
      console.log(e.response);
      if (e.response.status == 404) {
        toast.error("404 page not found");
      }
      toast.error(e.response.data.message);
    }
    reset();
  };
  return (
    <div>
      <div className="w-2/4 m-auto justify-around">
        <form
          className="w-[60%] m-auto"
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <div className=" flex-col justify-center my-10">
            <p className="font-bold text-3xl text-center">
              Enter your URL to start!
            </p>
          </div>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-900">
              URL :
            </label>
            <input
              type="text"
              id="url"
              {...register("url")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="http://example.com"
              required
            />
            <p className="text-red-800">{errors.url?.message}</p>
          </div>
          <div>
            <input
              type="submit"
              value={"Shorten Link"}
              className="bg-[#293241]  text-white font-bold border border-gray-300 text-sm rounded-lg block w-full p-2.5"
            />
          </div>
        </form>
        {shortUrl && (
          <div className="flex w-full my-5 mx-12">
            <p className="p-3.5 font-bold text-blue-600">
              Short URL:
              {/* <input type="text" value={shortUrl} readOnly className="inline" /> */}
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>
            </p>
            <button
              onClick={() => navigator.clipboard.writeText(shortUrl)}
              className="bg-[#293241]  text-white font-bold border border-gray-300 text-sm rounded-lg p-2.5"
            >
              Copy URL
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UrlShortening;
