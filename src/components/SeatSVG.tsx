import React from "react";

// car svg for loading animation
const SeatSVG = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    fill="#000000"
    height="40px"
    width="40px"
    version="1.1"
    id="Layer_1"
    viewBox="0 0 512 512"
    xml:space="preserve"
  >
    <g>
      <g>
        <path d="M432.613,348.736c-3.872-1.706-7.722-3.008-11.492-3.981c1.68-7.537,3.097-15.447,4.276-23.675    c2.091-14.558,1.532-29.479-1.576-44.059l-26.646-124.91c-4.613-16.407-13.781-29.182-26.559-38.998    c7.581-9.664,10.672-22.816,6.732-35.738l-8.005-47.968l-1.042-3.912C362.625,10.203,348.073,0,331.767,0H180.258    c-16.29,0-30.824,10.181-36.535,25.44l-13.86,51.58c-5.074,13.54-1.075,28.288,8.384,38.424    c-11.093,9.27-19.061,20.91-23.129,35.322L88.12,277.014c-3.109,14.586-3.668,29.508-1.576,44.073    c1.179,8.232,2.597,16.146,4.278,23.686c-3.744,0.971-7.566,2.267-11.41,3.96c-22.543,9.934-36.731,30.48-36.731,60.325    c0.683,14.501,5.085,33.088,16.639,51.945c19.423,31.701,52.814,50.92,100.452,50.985c0.077,0.001,0.152,0.012,0.23,0.012h192    c0.056,0,0.109-0.008,0.165-0.008c47.675-0.042,81.092-19.266,100.529-50.985c11.555-18.856,15.961-37.441,16.622-50.9    C469.344,379.216,455.157,358.67,432.613,348.736z M183.174,42.667h145.125l7.12,42.667h-67.644c-2.425-0.032-4.808-0.032-7.136,0    h-88.924L183.174,42.667z M129.848,285.915l26.665-124.9c3.386-11.834,18.426-21.817,43.274-27.72    c10.376-2.465,21.666-4.008,33.2-4.769c4.929-0.325,9.502-0.485,13.577-0.526h3.889c1.062,0.01,2.095,0.025,3.064,0.051    c1.298,0.041,1.298,0.041,1.399,0.047c2.208-0.006,2.208-0.006,3.506-0.047c0.969-0.026,2.003-0.041,3.064-0.051h3.886    c4.077,0.041,8.653,0.201,13.584,0.526c11.537,0.761,22.83,2.305,33.208,4.771c24.848,5.905,39.893,15.889,43.617,29.066    l26.311,123.556c2.07,9.712,2.439,19.571,1.07,29.103c-5.363,37.44-17.238,63.667-32.217,68.25    c-0.151,0.041-0.299,0.092-0.451,0.129c-0.039,0.011-0.079,0.018-0.118,0.029c-0.394,0.092-0.795,0.164-1.197,0.228    c-6.045-2.153-14.371-4.742-24.541-7.304c-22.151-5.581-45.354-8.935-68.668-8.935c-23.304,0-46.505,3.354-68.659,8.934    c-10.029,2.526-18.255,5.076-24.28,7.211c-0.089,0.031-0.187,0.065-0.275,0.096c-0.38-0.062-0.759-0.129-1.132-0.216    c-0.054-0.014-0.109-0.025-0.164-0.04c-0.163-0.04-0.322-0.094-0.484-0.139c-14.971-4.599-26.838-30.818-32.199-68.237    C127.408,305.488,127.778,295.628,129.848,285.915z M95.702,438.713c-4.196-6.849-7.092-14.33-8.867-21.821    c-1.036-4.373-1.448-7.558-1.512-8.876c0.025-11.431,3.838-16.953,11.295-20.239c1.817-0.801,3.734-1.405,5.62-1.84    c3.782,5.992,8.006,11.337,12.687,15.987c6.633,8.433,14.486,14.948,23.744,19.173v46.323    C118.265,463.433,104.671,453.353,95.702,438.713z M181.348,469.333v-46.897c0.018-0.006,0.036-0.012,0.054-0.018    c1.149-0.374,2.332-0.748,3.544-1.121c0.107-0.033,0.213-0.066,0.32-0.099c1.215-0.372,2.46-0.743,3.735-1.111    c0.091-0.026,0.184-0.053,0.275-0.079c2.691-0.774,5.509-1.536,8.447-2.276c18.976-4.779,38.786-7.642,58.256-7.642    c19.461,0,39.264,2.862,58.237,7.642c4.497,1.133,8.718,2.318,12.621,3.516c0.021,0.006,0.042,0.013,0.062,0.019    c1.29,0.396,2.545,0.794,3.764,1.191c0.001,0,0.003,0.001,0.004,0.001v46.873H181.348z M425.189,416.89    c-1.776,7.492-4.674,14.974-8.871,21.824c-8.973,14.642-22.569,24.724-42.973,28.71v-46.36    c9.028-4.135,16.716-10.453,23.24-18.602c4.89-4.767,9.285-10.289,13.21-16.52c1.884,0.435,3.798,1.039,5.614,1.839    c7.457,3.286,11.269,8.808,11.269,21.281C426.638,409.33,426.225,412.517,425.189,416.89z" />
      </g>
    </g>
  </svg>
);

export default SeatSVG;