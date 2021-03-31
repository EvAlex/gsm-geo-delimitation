using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using GsmDataImporter.Model;

namespace GsmDataImporter
{
    internal class GsmCsvSchema
    {
        public int MccIndex { get; set; }

        public string  MncIndex { get; set; }

        public int LacIndex { get; set; }
        
        public int CellIndex { get; set; }

        public double LonIndex { get; set; }

        public string LatIndex { get; set; }

        public int SubjectIndex { get; set; }

        public string LocationIndex { get; set; }

        public string RasterIndex { get; set; }

        public string AdressIndex { get; set; } // not sure

        public string GenerationIndex { get; set; }

        public string HeightIndex { get; set; }

        public string TiltIndex { get; set; },

        public string AzimuthIndex { get; set; }

        public string FrequencyIndex { get; set; }

        //  TODO add other props
        //  MCC;MNC;LAC;CELL;RAC;LON;LAT;SUBJECT;DATE_ON;DATE_OFF;AZIMUTH;HEIGHT;TILT;RASTER;THICKNESS;FREQUENCY;POWER;AMPLIFICATION;BORDER;LOCATION;ADDRESS;GENERATION;CONTROLLER_NUM
    }
}