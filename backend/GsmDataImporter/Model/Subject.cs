namespace GsmDataImporter.Model
{
    public readonly struct Subject
    {
        private readonly int value;

        public Subject(int value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is Subject
                ? value.Equals(((Subject)obj).value)
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

        public static bool operator ==(Subject a, Subject b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(Subject a, Subject b)
        {
            return a.value != b.value;
        }
    }
}
