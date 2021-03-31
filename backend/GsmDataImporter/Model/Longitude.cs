namespace GsmDataImporter.Model
{
    public readonly struct Longitude
    {
        private readonly double value;

        public Latitude(double value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Longitude
                ? value.Equals(((Longitude)obj).value)
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

        public static bool operator ==(Longitude a, Longitude b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Longitude a, Longitude b)
        {
            return a.value != b.value;
        }
    }
}
