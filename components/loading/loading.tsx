const Loading = () => {
  return (
    <div className="tw-z-50 tw-top-0 tw-left-0 tw-fixed tw-w-full tw-h-full tw-bg-primary/5">
      <div className="tw-flex tw-items-center tw-justify-center tw-h-full">
        <div className="tw-loader tw-max-w-fit tw-flex tw-flex-col tw-items-center tw-pt-10 tw-gap-2">
          <div className="tw-flex tw-space-x-1">
            <div
              className="tw-w-4 tw-h-4 tw-bg-red-500 tw-rounded-full tw-animate-bounce tw-duration-500"
              style={{ animationDelay: "0s" }}
            ></div>
            <div
              className="tw-w-4 tw-h-4 tw-bg-yellow-500 tw-rounded-full tw-animate-bounce tw-duration-500"
              style={{ animationDelay: "0.1s" }}
            ></div>
            <div
              className="tw-w-4 tw-h-4 tw-bg-green-500 tw-rounded-full tw-animate-bounce tw-duration-500"
              style={{ animationDelay: "0.2s" }}
            ></div>
          </div>
          <div>Carregando...</div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
