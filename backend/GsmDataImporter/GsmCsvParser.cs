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
                //  TODO add other props
                //  MCC;MNC;LAC;CELL;RAC;LON;LAT;SUBJECT;DATE_ON;DATE_OFF;AZIMUTH;HEIGHT;TILT;RASTER;THICKNESS;FREQUENCY;POWER;AMPLIFICATION;BORDER;LOCATION;ADDRESS;GENERATION;CONTROLLER_NUM
            };
        }

        private GsmCsvSchema CreateDefaultSchema()
        {
            return new GsmCsvSchema
            {
                MccIndex = 0,
                MncIndex = 1,
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