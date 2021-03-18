using System;
using System.IO;
using System.Text;
using System.Linq;
using Xunit;
using GsmDataImporter.Model;

namespace GsmDataImporter.Tests
{
    public class GsmCsvParserTests
    {
        private readonly GsmCsvParser parser;
        private readonly Stream inputStream;

        public GsmCsvParserTests()
        {
            parser = new GsmCsvParser();
            inputStream = GenerateStreamFromString(@"MCC;MNC;LAC;CELL;RAC;LON;LAT;SUBJECT;DATE_ON;DATE_OFF;AZIMUTH;HEIGHT;TILT;RASTER;THICKNESS;FREQUENCY;POWER;AMPLIFICATION;BORDER;LOCATION;ADDRESS;GENERATION;CONTROLLER_NUM
250;99;150;5000131;;36.7245;55.3767;46238501000;2001-01-01;2015-11-03;355.0;;;;;800.0;;;;outdoor;Россия, Московская обл., Наро-Фоминский р-н., Наро-Фоминск г., Ленина ул., д. 28;LTE;
267;99;150;5000132;;36.7245;55.3767;46238501000;2001-01-01;2015-11-03;120.0;;;;;800.0;;;;outdoor;Россия, Московская обл., Наро-Фоминский р-н., Наро-Фоминск г., Ленина ул., д. 28;LTE;
318;99;150;5000133;;36.7245;55.3767;46238501000;2001-01-01;2015-11-03;230.0;;;;;800.0;;;;outdoor;Россия, Московская обл., Наро-Фоминский р-н., Наро-Фоминск г., Ленина ул., д. 28;LTE;
378;99;177;7700024;;37.5669;55.85715;45000000000;2017-03-15;2017-03-25;30.0;;;;;2600.0;;;;outdoor;Россия, Москва г., Дубнинская ул., д. 7, столб;LTE;
562;99;177;7700024;;37.5669;55.85715;45000000000;2017-03-26;2017-05-24;30.0;23.0;;60.0;4.8;2600.0;;17.3;;outdoor;Россия, Москва г., Дубнинская ул., д. 7, столб;LTE;");
        }

        [Fact]
        public void ParsesAllEntries()
        {
            //  arrange

            //  act
            var actual = parser.Parse(inputStream);

            //  assert
            Assert.Equal(5, actual.Count());
        }

        [Fact]
        public void ParsesMcc()
        {
            //  arrange
            var expected = new[] { 250, 267, 318, 378, 562 }
                .Select(e => new MobileCountryCode(e));

            //  act
            var actual = parser.Parse(inputStream).ToArray();

            //  assert
            Assert.Equal(expected, actual.Select(e => e.MobileCountryCode));
        }

        public static MemoryStream GenerateStreamFromString(string value)
        {
            return new MemoryStream(Encoding.UTF8.GetBytes(value ?? ""));
        }
    }
}
