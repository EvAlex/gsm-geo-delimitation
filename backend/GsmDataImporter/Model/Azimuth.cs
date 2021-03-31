namespace GsmDataImporter.Model
{
    public readonly struct Azimuth
    {
        private readonly double value;

        public Azimuth(double value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Azimuth
                ? value.Equals(((Azimuth)obj).value)
                : false;
        }

        public override int GetHashCode()
        {
            return value.GetHashCode();
        }

        public override string ToString()
        {
            return value.ToString();
        }

        public static bool operator ==(Azimuth a, Azimuth b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Azimuth a, Azimuth b)
        {
            return a.value != b.value;
        }
    }
}
