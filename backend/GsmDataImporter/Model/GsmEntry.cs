using System;

namespace GsmDataImporter.Model
{
    public class GsmEntry
    {
        public MobileCountryCode MobileCountryCode { get; set; }

        //  TODO: implement all other props
        //  MCC;MNC;LAC;CELL;RAC;LON;LAT;SUBJECT;DATE_ON;DATE_OFF;AZIMUTH;HEIGHT;TILT;RASTER;THICKNESS;FREQUENCY;POWER;AMPLIFICATION;BORDER;LOCATION;ADDRESS;GENERATION;CONTROLLER_NUM
        //  https://cellidfinder.com/articles/how-to-find-cellid-location-with-mcc-mnc-lac-i-cellid-cid
    }
}