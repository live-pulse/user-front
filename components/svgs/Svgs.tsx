interface Size {
  width: number;
  height: number;
}

const userIcon = ({width, height}: Size) => {
  return <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="User / User_01">
      <path id="Vector"
            d="M19 21C19 17.134 15.866 14 12 14C8.13401 14 5 17.134 5 21M12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7C16 9.20914 14.2091 11 12 11Z"
            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>
};

const bellIcon = ({width, height}: Size) => {
  return <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="Communication / Bell">
      <path id="Vector"
            d="M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9M15 17H18.5905C18.973 17 19.1652 17 19.3201 16.9478C19.616 16.848 19.8475 16.6156 19.9473 16.3198C19.9997 16.1643 19.9997 15.9715 19.9997 15.5859C19.9997 15.4172 19.9995 15.3329 19.9863 15.2524C19.9614 15.1004 19.9024 14.9563 19.8126 14.8312C19.7651 14.7651 19.7048 14.7048 19.5858 14.5858L19.1963 14.1963C19.0706 14.0706 19 13.9001 19 13.7224V10C19 6.134 15.866 2.99999 12 3C8.13401 3.00001 5 6.13401 5 10V13.7224C5 13.9002 4.92924 14.0706 4.80357 14.1963L4.41406 14.5858C4.29476 14.7051 4.23504 14.765 4.1875 14.8312C4.09766 14.9564 4.03815 15.1004 4.0132 15.2524C4 15.3329 4 15.4172 4 15.586C4 15.9715 4 16.1642 4.05245 16.3197C4.15225 16.6156 4.3848 16.848 4.68066 16.9478C4.83556 17 5.02701 17 5.40956 17H9"
            stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </g>
  </svg>
};

const realCameraIcon = ({width, height}: Size) => {
  return <>
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 256 256">
      <path
        d="m129.27 142.19-85.32-46.82a2.31 2.31 0 0 0 -3.43 2c-.41 18-2 93.55.09 96 3.31 3.88 85.08 51.16 88.67 51.16s84.53-48.76 88.67-51.16c3.66-2.11.86-78.2.15-96.08a2.32 2.32 0 0 0 -3.43-1.93z"
        fill="#191919"/>
      <path
        d="m129.27 252.5c-2.47 0-4.81 0-48.44-25.2-42.92-24.79-45.39-27.68-46.32-28.77-2.38-2.8-3.28-3.85-2.89-47.45.19-21.47.69-44.87.9-53.93a10.31 10.31 0 0 1 15.28-8.8l81.48 44.71 81.54-44.74a10.32 10.32 0 0 1 15.27 8.68c.36 9.09 1.23 32.57 1.57 54.15.19 12.24.17 22 0 29.11-.38 12.16-1 17.37-5.66 20.07-.67.39-3.4 2-7.5 4.47-80.02 47.7-81.87 47.7-85.23 47.7zm-81.27-63.59c11.93 8.12 68.16 40.61 81.26 47 8-4 33.89-19.1 77-44.86l4.92-2.94c1-9.16.77-40.76-.71-81.3l-77.35 42.39a8 8 0 0 1 -7.7 0l-77.11-42.31c-.88 41.74-1.01 73-.31 82.02z"
        fill="#191919"/>
      <path d="m40.6 91.49 88.67-47.29 88.67 47.29-88.67 48.65z" fill="#ffffff"/>
      <path d="m130.52 41.08v95.94l-88.67-48.66z" fill="#e6e6e6"/>
      <path
        d="m129.27 142.19-88.67-48.66s-2.38 97 0 99.81c3.31 3.88 85.08 51.16 88.67 51.16s84.53-48.76 88.67-51.16 0-99.81 0-99.81z"
        fill="#e83a2a"/>
      <path
        d="m129.27 142.19c-1 2.06-2 102.81 0 102.31 6.35-1.56 85.32-46.93 89-51.75 1.58-2.09 2.39-97.93-.31-99.22s-87.66 46.6-88.69 48.66z"
        fill="#d32920"/>
      <path
        d="m217.42 88c4.59-2.53 29.46-16.33 28.15-17.09s-87.67-45.94-89.85-46.6c-2-.61-24.48 14.1-28.13 16.5-3.76-2.61-30.82-21.24-33.9-19.52-3.31 1.8-83.39 46.48-86.26 48.14-2.64 1.57 26.79 16.36 31.34 18.64-4.25 2.15-29.69 14.59-28.12 15.49s83.82 49.44 88.22 49.92c2.83.31 25.8-14.24 28.82-16.24 3.38 2.24 31 20.48 33.76 18.92l87.13-50c1.61-.88-25.92-15.44-31.16-18.16zm-89.73 48.86-87.75-48.81 87.59-46.72 88.31 46.58z"
        fill="#191919"/>
      <path
        d="m161.14 164.31c-4 0-9.47-2.68-20.47-9.33-4.79-2.9-9.64-6-13-8.2-2.87 1.8-6.64 4.14-10.33 6.33-13.41 7.89-16.34 8.65-19.34 8.33-2.56-.28-5.74-.62-89.37-49.78l-2-1.17a8.12 8.12 0 0 1 -4.06-7.29c.17-5.52 4.61-7.87 14.34-13 1.38-.73 2.82-1.48 4.25-2.21l-3.58-1.99c-14.26-7.76-18.15-10.64-18.31-16.06a8.3 8.3 0 0 1 4.17-7.44c2.2-1.27 46.78-26.15 83.79-46.8l2.57-1.43c5.16-2.88 11-.32 24.84 8.34 4.81 3 9.61 6.2 13.06 8.54 24.9-16.2 26.79-15.62 30.37-14.52 3.42 1 90.8 46.91 91.51 47.33a8.18 8.18 0 0 1 4.04 7.04c-.05 5.43-3.52 7.44-16.41 14.93l-3.21 1.86 4.77 2.63c14.33 8 17.72 10.07 17.82 15.51a8.13 8.13 0 0 1 -4.07 7.2l-79.15 45.38-8 4.58a8.31 8.31 0 0 1 -4.23 1.22zm-18.25-26.76c7.55 4.74 14 8.49 17.37 10.08l5.21-3 67.9-38.93c-4.31-2.43-9.94-5.51-16.7-9.1zm-116.71-34.15c44.25 25.93 66.18 38.21 72.94 41.54 2.91-1.42 8.15-4.46 13.18-7.51l-73.1-40.63c-5.51 2.75-9.76 4.91-13.02 6.6zm30.49-15.2 71 39.48 71.33-39.58-71.48-37.7zm-34.45-17.88c4.58 2.57 10.55 5.74 17 9l73.28-39.08a184 184 0 0 0 -17.58-10.52c-40.63 22.67-61.84 34.52-72.71 40.6zm120.7-29.91 73.68 38.86c5-2.78 9.58-5.39 13.34-7.59-20.94-11-63.28-33-74.59-38.71-2.62 1.41-7.08 4.03-12.43 7.44z"
        fill="#191919"/>
      <path
        d="m218.42 88c .08-1.3 28.46-16.33 27.15-17.09s-87.67-45.94-89.85-46.6c-2-.61-27.54 16.43-28.13 16.5s-30.83-21.28-33.9-19.56c-3.31 1.84-83.39 46.52-86.26 48.18-2.64 1.57 31.27 17.8 31.34 18.64s-29.69 14.59-28.13 15.49 83.83 49.44 88.23 49.92c2.83.31 27.92-16.24 28.82-16.24s31 20.48 33.76 18.92l87.13-50c1.61-.88-30.24-16.89-30.16-18.16zm-90.73 48.86c-1-.08-87.72-48.14-87.74-48.78s87-46.63 87.59-46.72 88.32 45.33 88.31 46.58-87.15 48.97-88.16 48.89z"
        fill="#ffffff"/>
      <path
        d="m72.15 187.68-.44-35.68c0-2.23 2.05-2.7 3.71-.82l25.44 28.82c1.59 1.81 1.62 4.47.06 4.89l-25 6.81c-1.63.49-3.74-1.79-3.77-4.02z"
        fill="#ffffff"/>
      <path d="m128.67 142.67c-.67 17.17-1 77.67.61 101.83" fill="#d32920"/>
      <path
        d="m129.27 248.5a4 4 0 0 1 -4-3.73c-1.64-24.68-1.27-85.22-.61-102.25a4 4 0 1 1 8 .31c-.64 16.44-1 77.43.6 101.41a4 4 0 0 1 -3.73 4.26z"
        fill="#191919"/>
    </svg>
  </>
}

const plusIcon = ({width, height}: Size) => {
  return <>
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Edit / Add_Plus">
        <path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke="#000000" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"/>
      </g>
    </svg>
  </>;
}

const notificationIcon = ({width, height}: Size) => {
  return <>
    <svg width={width} height={height} viewBox="0 0 15 15" xmlns="https://www.w3.org/2000/svg" focusable="false"
         aria-hidden="true" className="LiveNoticeButton_icon_inactive_DGdgc">
      <path
        d="M14.927 9.437h-2.188V7.25h-1.042v2.187H9.51v1.042h2.187v2.188h1.042v-2.188h2.188V9.437zm-8.542 4.271a2.284 2.284 0 01-1.922-1.042h3.844a2.284 2.284 0 01-1.922 1.042h0zm4.27-1.042v-.833H1.052l.699-1.255a.418.418 0 00.052-.203V6.416a4.589 4.589 0 014.583-4.583 4.59 4.59 0 014.579 4.375h.834A5.424 5.424 0 006.385 1 5.423 5.423 0 00.968 6.416v3.85l-.903 1.628a.522.522 0 00.456.772h3a3.115 3.115 0 002.864 1.875 3.115 3.115 0 002.865-1.875h1.406z"
        stroke="#F2312E" fill="#F2312E"></path>
    </svg>
  </>;
}

const outIcon = ({width, height}: Size) => {
  return <>
    <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none">
      <path d="M16 8L8 16M8 8L16 16" stroke="#fff" stroke-width="2" stroke-linecap="round"/>
    </svg>
  </>;
}

const CameraIcon = ({width, height}: Size) => {
  return (
    <svg width={width || 24} height={height || 24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.44 6.236c.04.07.11.12.2.12 2.4 0 4.36 1.958 4.36 4.355v5.934A4.368 4.368 0 0117.64 21H6.36A4.361 4.361 0 012 16.645V10.71a4.361 4.361 0 014.36-4.355c.08 0 .16-.04.19-.12l.06-.12.106-.222a97.79 97.79 0 01.714-1.486C7.89 3.51 8.67 3.01 9.64 3h4.71c.97.01 1.76.51 2.22 1.408.157.315.397.822.629 1.31l.141.299.1.22zm-.73 3.836c0 .5.4.9.9.9s.91-.4.91-.9-.41-.909-.91-.909-.9.41-.9.91zm-6.44 1.548c.47-.47 1.08-.719 1.73-.719.65 0 1.26.25 1.72.71.46.459.71 1.068.71 1.717A2.438 2.438 0 0112 15.756c-.65 0-1.26-.25-1.72-.71a2.408 2.408 0 01-.71-1.717v-.01c-.01-.63.24-1.24.7-1.699zm4.5 4.485a3.91 3.91 0 01-2.77 1.15 3.921 3.921 0 01-3.93-3.926 3.865 3.865 0 011.14-2.767A3.921 3.921 0 0112 9.402c1.05 0 2.04.41 2.78 1.15.74.749 1.15 1.738 1.15 2.777a3.958 3.958 0 01-1.16 2.776z"
      />
    </svg>
  );
};

const Password = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 15 15" fill="none">
    <path d="M12.5 8.5V7.5C12.5 6.94772 12.0523 6.5 11.5 6.5H1.5C0.947715 6.5 0.5 6.94772 0.5 7.5V13.5C0.5 14.0523 0.947715 14.5 1.5 14.5H11.5C12.0523 14.5 12.5 14.0523 12.5 13.5V12.5M12.5 8.5H8.5C7.39543 8.5 6.5 9.39543 6.5 10.5C6.5 11.6046 7.39543 12.5 8.5 12.5H12.5M12.5 8.5C13.6046 8.5 14.5 9.39543 14.5 10.5C14.5 11.6046 13.6046 12.5 12.5 12.5M3.5 6.5V3.5C3.5 1.84315 4.84315 0.5 6.5 0.5C8.15685 0.5 9.5 1.84315 9.5 3.5V6.5M12 10.5H13M10 10.5H11M8 10.5H9" stroke="#000000"/>
  </svg>;
};

const Mail = ({fill, size, height, width, ...props}) => {
  return (
    <svg
      width={size || width || 24}
      height={size || height || 24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M12 20.5H7c-3 0-5-1.5-5-5v-7c0-3.5 2-5 5-5h10c3 0 5 1.5 5 5v3"/>
        <path
          d="M17 9l-3.13 2.5a3.166 3.166 0 01-3.75 0L7 9M19.21 14.77l-3.539 3.54a1.232 1.232 0 00-.3.59l-.19 1.35a.635.635 0 00.76.76l1.35-.19a1.189 1.189 0 00.59-.3l3.54-3.54a1.365 1.365 0 000-2.22 1.361 1.361 0 00-2.211.01zM18.7 15.28a3.185 3.185 0 002.22 2.22"/>
      </g>
    </svg>
  );
};

const UserIcon = ({
                    fill = 'currentColor',
                    filled,
                    size,
                    height,
                    width,
                    label,
                    ...props
                  }) => {
  return (
    <svg
      data-name="Iconly/Curved/Profile"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size || width || 24}
      height={size || height || 24}
      {...props}
    >
      <g
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeMiterlimit={10}
        strokeWidth={1.5}
      >
        <path
          data-name="Stroke 1"
          d="M11.845 21.662C8.153 21.662 5 21.088 5 18.787s3.133-4.425 6.845-4.425c3.692 0 6.845 2.1 6.845 4.4s-3.134 2.9-6.845 2.9z"
        />
        <path
          data-name="Stroke 3"
          d="M11.837 11.174a4.372 4.372 0 10-.031 0z"
        />
      </g>
    </svg>
  );
};

const PhotoIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 -3 32 32" preserveAspectRatio="xMidYMid">
    <path d="M29.000,26.000 L3.000,26.000 C1.346,26.000 -0.000,24.654 -0.000,23.000 L-0.000,7.000 C-0.000,5.346 1.346,4.000 3.000,4.000 L7.381,4.000 L9.102,0.554 C9.270,0.214 9.617,0.000 9.996,0.000 L22.006,0.000 C22.385,0.000 22.731,0.214 22.901,0.554 L24.619,4.000 L29.000,4.000 C30.654,4.000 32.000,5.346 32.000,7.000 L32.000,23.000 C32.000,24.654 30.654,26.000 29.000,26.000 ZM30.000,7.000 C30.000,6.449 29.551,6.000 29.000,6.000 L24.000,6.000 C23.950,6.000 23.907,5.979 23.859,5.972 C23.788,5.961 23.717,5.955 23.649,5.929 C23.588,5.906 23.537,5.869 23.482,5.834 C23.428,5.801 23.373,5.773 23.326,5.729 C23.273,5.680 23.235,5.620 23.194,5.560 C23.166,5.520 23.127,5.491 23.105,5.446 L21.387,2.000 L10.615,2.000 L8.895,5.446 C8.848,5.541 8.785,5.623 8.715,5.695 C8.701,5.710 8.684,5.719 8.669,5.733 C8.597,5.798 8.518,5.851 8.432,5.892 C8.403,5.907 8.375,5.919 8.344,5.931 C8.234,5.971 8.120,5.999 8.002,6.000 C8.001,6.000 8.001,6.000 8.000,6.000 L3.000,6.000 C2.449,6.000 2.000,6.449 2.000,7.000 L2.000,23.000 C2.000,23.551 2.449,24.000 3.000,24.000 L29.000,24.000 C29.551,24.000 30.000,23.551 30.000,23.000 L30.000,7.000 ZM16.000,21.000 C12.140,21.000 9.000,17.860 9.000,14.000 C9.000,10.140 12.140,7.000 16.000,7.000 C19.860,7.000 23.000,10.140 23.000,14.000 C23.000,17.860 19.860,21.000 16.000,21.000 ZM16.000,9.000 C13.243,9.000 11.000,11.243 11.000,14.000 C11.000,16.757 13.243,19.000 16.000,19.000 C18.757,19.000 21.000,16.757 21.000,14.000 C21.000,11.243 18.757,9.000 16.000,9.000 Z"/>
  </svg>;
};

const NameIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="25" height="25" viewBox="0 0 32 32" version="1.1">
    <path d="M26.731 9.902c-0.005-0.035-0.011-0.066-0.019-0.095l0.001 0.005c-0.031-0.134-0.094-0.249-0.182-0.342l0 0-8-8c-0.092-0.087-0.207-0.15-0.335-0.181l-0.005-0.001c-0.027-0.008-0.059-0.014-0.092-0.019l-0.003-0c-0.026-0.007-0.059-0.014-0.092-0.019l-0.004-0h-12c-0.414 0-0.75 0.336-0.75 0.75v0 28c0 0.414 0.336 0.75 0.75 0.75h20c0.414-0 0.75-0.336 0.75-0.75v0-20c-0.005-0.038-0.012-0.071-0.020-0.103l0.001 0.005zM24.189 9.25h-5.439v-5.439zM6.75 29.25v-26.5h10.5v7.25c0 0.414 0.336 0.75 0.75 0.75h7.25v18.5z"/>
  </svg>;
};

const PhoneIcon = () => {
  return <svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="25" height="25" viewBox="0 0 32 32" version="1.1">
    <path d="M8.194 1.156c1.169 1.612 2.563 3.694 4.175 6.237 0.406 0.688 0.344 1.512-0.181 2.481-0.2 0.406-0.706 1.331-1.512 2.787 0.887 1.25 2.238 2.787 4.056 4.6s3.331 3.169 4.538 4.056c1.45-0.85 2.381-1.369 2.788-1.575 0.525-0.281 1.031-0.425 1.512-0.425 0.363 0 0.688 0.081 0.969 0.244 1.856 1.131 3.956 2.525 6.294 4.175 0.444 0.325 0.694 0.769 0.756 1.331 0.063 0.569-0.113 1.169-0.512 1.819-0.2 0.281-0.525 0.694-0.969 1.244-0.444 0.544-1.113 1.231-2 2.056s-1.613 1.244-2.181 1.244h-0.063c-4.269-0.169-9.531-3.369-15.762-9.6-6.237-6.238-9.438-11.494-9.6-15.769 0-0.563 0.412-1.3 1.244-2.212 0.825-0.906 1.506-1.563 2.025-1.969 0.525-0.4 0.969-0.725 1.331-0.969 0.444-0.325 0.95-0.481 1.513-0.481 0.694 0 1.212 0.244 1.581 0.725zM6.194 2.425c-0.85 0.606-1.644 1.287-2.394 2.031-0.744 0.75-1.181 1.3-1.3 1.662 0.163 3.756 3.156 8.537 8.988 14.35s10.625 8.819 14.375 9.019c0.325-0.119 0.856-0.563 1.606-1.331s1.425-1.575 2.025-2.419c0.119-0.163 0.163-0.3 0.119-0.425-2.419-1.694-4.438-3.044-6.056-4.056-0.163 0-0.363 0.063-0.606 0.181-0.363 0.2-1.269 0.706-2.725 1.512l-1.031 0.606-1.031-0.669c-1.331-0.925-2.944-2.363-4.844-4.3-1.894-1.894-3.306-3.512-4.238-4.844l-0.725-0.969 0.606-1.088c0.806-1.45 1.313-2.363 1.512-2.725 0.119-0.244 0.181-0.444 0.181-0.606-1.438-2.294-2.769-4.313-3.981-6.050h-0.063c-0.156 0-0.3 0.044-0.419 0.119z"/>
  </svg>;
}

export {
  userIcon,
  bellIcon,
  realCameraIcon,
  plusIcon,
  notificationIcon,
  outIcon,
  CameraIcon,
  Password,
  Mail,
  UserIcon,
  PhotoIcon,
  NameIcon,
  PhoneIcon,
};
