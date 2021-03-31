using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using GsmDataImporter.Model;

namespace GsmDataImporter
{
    public class GsmCsvParser
    {
        public IEnumerable<GsmEntry> Parse(Stream stream)
        {
            using (var reader = new StreamReader(stream))
            {
                string firstLine = reader.ReadLine();
                char separator = DetermineSeparator(firstLine);
                var parts = firstLine.Split(separator);
                bool isHeaderLine = IsHeaderLine(parts);
                GsmCsvSchema schema = isHeaderLine
                    ? CreateSchema(parts)
                    : CreateDefaultSchema();

                if (!isHeaderLine)
                    yield return ParseLine(parts, schema);

                while (!reader.EndOfStream)
                {
                    string line = reader.ReadLine();

                    parts = line.Split(separator);
                    
                    yield return ParseLine(parts, schema);
                }
            }
        }

        private char DetermineSeparator(string line)
        {
            char[] options = new[] { ';', ',', '\t' };

            return options
                .OrderByDescending(candidate => line.Split(candidate).Length)
                .First();
        }

        private GsmEntry ParseLine(string[] lineParts, GsmCsvSchema schema)
        {
            return new GsmEntry
            {
                MobileCountryCode = new MobileCountryCode(int.Parse(lineParts[schema.MccIndex])),
                MobileNetworkCode = new MobileNetworkCode(string.Parse(lineParts[schema.MncIndex])),
                LocationAreaCode = new LocationAreaCode(int.Parse(lineParts[schema.LacIndex])),
                CellId = new CellId(int.Parse(lineParts[schema.CellIndex])),
                Longitude = new Longitude(double.Parse(lineParts[schema.LonIndex])),
                Latitude = new Latitude(double.Parse(lineParts[schema.LatIndex])),
                Subject = new Subject(int.Parse(lineParts[schema.SubjectIndex])),
                Location = new Location(string.Parse(lineParts[schema.LocationIndex])),
                Raster = new Raster(double.Parse(lineParts[schema.RasterIndex])),
                Address = new Address(string.Parse(lineParts[schema.AdressIndex])),
                Generation = new Generation(string.Parse(lineParts[schema.GenerationIndex])),
                Height = new Height(double.Parse(lineParts[schema.HeightIndex])),
                Tilt = new Tilt(double.Parse(lineParts[schema.TiltIndex])),
                Azimuth = new Azimuth(double.Parse(lineParts[schema.AzimuthIndex])),
                Frequency = new Frequency(double.Parse(lineParts[schema.FrequencyIndex])),


                //  TODO add other props
                //  DATE_ON;DATE_OFF - ��������� ���?
                // RAC - �� ������� �������� ���� �������,  � ������� ������� ��������� ����
                // AMPLIFICATION,THICKNESS - ���� �������� ��� ���� ��� ��� double(�������� ����� ��� exel);
                // BORDER - ������� ������ ����
                // POWER - ������� ������ ����
            };  
        }

        private GsmCsvSchema CreateDefaultSchema()
        {
            return new GsmCsvSchema
            {
                MccIndex = 0,
                MncIndex = "", // not sure
                LacIndex = 0,
                CellIndex = 0,
                LonIndex = 0.,
                LatIndex = 0.,
                SubjectIndex = 0,
                LocationIndex = "", // not sure
                RasterIndex = 0.,
                AdressIndex = "", // not sure
                GenerationIndex = "",
                HeightIndex = 0.,
                TiltIndex = 0.,
                AzimuthIndex = 0.,
                FrequencyIndex = 0.,


                //  TODO add other props 
                //  MCC;MNC;LAC;CELL;RAC;LON;LAT;SUBJECT;DATE_ON;DATE_OFF;AZIMUTH;HEIGHT;TILT;RASTER;THICKNESS;FREQUENCY;POWER;AMPLIFICATION;BORDER;LOCATION;ADDRESS;GENERATION;CONTROLLER_NUM
            };
        }

        private GsmCsvSchema CreateSchema(string[] headerLineParts)
        {
            return new GsmCsvSchema
            {
                MccIndex = FindHeaderCellIndex(headerLineParts, "mcc", "mobile country code"),
                MncIndex = FindHeaderCellIndex(headerLineParts, "mnc", "mobile network code"),
                LacIndex = FindHeaderCellIndex(headerLineParts, "lac", "Location are code"),
                CellIndex = FindHeaderCellIndex(headerLineParts, "cell"),
                LonIndex = FindHeaderCellIndex(headerLineParts, "lot"),
                LatIndex = FindHeaderCellIndex(headerLineParts, "lat"),
                SubjectIndex = FindHeaderCellIndex(headerLineParts, "subject"),
                LocationIndex = FindHeaderCellIndex(headerLineParts, "location"), 
                RasterIndex = FindHeaderCellIndex(headerLineParts, "raster"),
                AdressIndex = FindHeaderCellIndex(headerLineParts, "address"), 
                GenerationIndex = FindHeaderCellIndex(headerLineParts, "generation"),
                HeightIndex = FindHeaderCellIndex(headerLineParts, "height"),
                TiltIndex = FindHeaderCellIndex(headerLineParts, "tilt"),
                AzimuthIndex = FindHeaderCellIndex(headerLineParts, "Azimuth"),
                FrequencyIndex = FindHeaderCellIndex(headerLineParts, "frequency"),
                //  TODO add other props
                //  MCC;MNC;LAC;CELL;RAC;LON;LAT;SUBJECT;DATE_ON;DATE_OFF;AZIMUTH;HEIGHT;TILT;RASTER;THICKNESS;FREQUENCY;POWER;AMPLIFICATION;BORDER;LOCATION;ADDRESS;GENERATION;CONTROLLER_NUM
            };
        }

        private int FindHeaderCellIndex(string[] headerLineParts, params string[] options)
        {
            options = options.Select(option => option.Trim()).ToArray();

            return headerLineParts
                .Select(cell => cell.Trim())
                .Select((cell, index) => new
                {
                    Score = options.Count(option => string.Equals(option, cell, StringComparison.InvariantCultureIgnoreCase)),
                    Index = index
                })
                .OrderByDescending(e => e.Score)
                .First()
                .Index;
        }

        private bool IsHeaderLine(string[] lineParts)
        {
            return lineParts.All(cell => new Regex("[a-zA-Z]").IsMatch(cell));
        }
    }
}