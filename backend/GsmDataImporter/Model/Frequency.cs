namespace GsmDataImporter.Model
{
    public readonly struct Frequency
    {
        private readonly double value;

        public Frequency(double value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Frequency
                ? value.Equals(((Frequency)obj).value)
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

        public static bool operator ==(Frequency a, Frequency b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Frequency a, Frequency b)
        {
            return a.value != b.value;
        }
    }
}
