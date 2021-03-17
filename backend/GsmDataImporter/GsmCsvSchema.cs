using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using GsmDataImporter.Model;

namespace GsmDataImporter
{
    internal class GsmCsvSchema
    {
        public int MccIndex { get; set; }

        public int MncIndex { get; set; }

        //  TODO add other props
        //  MCC;MNC;LAC;CELL;RAC;LON;LAT;SUBJECT;DATE_ON;DATE_OFF;AZIMUTH;HEIGHT;TILT;RASTER;THICKNESS;FREQUENCY;POWER;AMPLIFICATION;BORDER;LOCATION;ADDRESS;GENERATION;CONTROLLER_NUM
    }
}