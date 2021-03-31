namespace GsmDataImporter.Model
{
    public readonly struct CellId
    {
        private readonly int value;

        public CellId(int value)
        {
            this.value = value;
        }

        public override bool Equals(object obj)
        {
            return obj is CellId
                ? value.Equals(((CellId)obj).value)
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

        public static bool operator ==(CellId a, CellId b)
        {
            return a.value == b.value;
        }

        public static bool operator !=(CellId a, CellId b)
        {
            return a.value != b.value;
        }
    }
}
