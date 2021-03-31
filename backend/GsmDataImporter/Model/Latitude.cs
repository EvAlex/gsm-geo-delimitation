namespace GsmDataImporter.Model
{
    public readonly struct Latitude
    {
        private readonly double value;

        public Latitude(double value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Latitude
                ? value.Equals(((Latitude)obj).value)
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

        public static bool operator ==(Latitude a, Latitude b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Latitude a, Latitude b)
        {
            return a.value != b.value;
        }
    }
}
