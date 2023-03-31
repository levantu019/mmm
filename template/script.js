//--------------- Map
var projection = new ol.proj.Projection({
    code: "EPSG:4326",
    units: "degrees",
});

var view = new ol.View({
    projection: projection,
    zoom: 10,
    center: [0, 0],
});

var map = new ol.Map({
    layers: [],
    target: document.getElementById("map"),
    view: view,
});

// Mouse position
const mousePositionControl = new ol.control.MousePosition({
    coordinateFormat: ol.coordinate.createStringXY(2),
    projection: "EPSG:4326",
    className: "custom-mouse-position",
    target: document.getElementById("mouse-position"),
});
map.addControl(mousePositionControl);

// WMS Layer
var wmsLayer = new ol.layer.Image({
    source: new ol.source.ImageWMS({
        ratio: 1,
        url: "http://gis.homtech.vn:8002/geoserver/sf/wms",
        params: {
            FORMAT: "image/png",
            VERSION: "1.1.1",
            STYLES: "",
            LAYERS: "sf:roads",
            exceptions: "application/vnd.ogc.se_inimage",
        },
    }),
});

// Image
const imageExtent = [0, 0, 700000, 1300000];
const imageLayer = new ol.layer.Image({
    source: new ol.source.ImageStatic({
        url:
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/" +
            "British_National_Grid.svg/2000px-British_National_Grid.svg.png",
        crossOrigin: "",
        projection: "EPSG:4326",
        imageExtent: imageExtent,
        interpolate: true,
    }),
});

// note
// transform point from prj1 --> prj2: ol.proj.transform(point, prj2, prj1)
// ex: ol.proj.transform([0, 0], 'EPSG:27700', 'EPSG:3857')

// List
var defaultData = [
    {
        text: "Parent 1",
        href: "#parent1",
        selectable: false,
        tags: ["4"],
        nodes: [
            {
                text: "Child 1",
                href: "#child1",
                tags: ["2"],
                nodes: [
                    {
                        text: "Grandchild 1",
                        href: "#grandchild1",
                        tags: ["0"],
                    },
                    {
                        text: "Grandchild 2",
                        href: "#grandchild2",
                        tags: ["0"],
                    },
                ],
            },
            {
                text: "Child 2",
                href: "#child2",
                tags: ["0"],
            },
        ],
    },
    {
        text: "Parent 2",
        href: "#parent2",
        tags: ["0"],
    },
    {
        text: "Parent 3",
        href: "#parent3",
        tags: ["0"],
    },
    {
        text: "Parent 4",
        href: "#parent4",
        tags: ["0"],
    },
    {
        text: "Parent 5",
        href: "#parent5",
        tags: ["0"],
    },
];

var $resultTree;
var $tree = $("#treeview").treeview({
    data: defaultData,
    showIcon: false,
    showCheckbox: true,
    onNodeChecked: function (event, node) {
        console.log(node);
    },
    onNodeUnchecked: function (event, node) {
        console.log(node);
    },
    onNodeSelected: function (event, data) {
        console.log(data);
    },
    onSearchComplete: function (event, result) {
        console.log(result);
    }
});
var findNodes = function () {
    return $tree.treeview("search", [
        $("#inp-search-object").val(),
        { ignoreCase: true, exactMatch: false },
    ]);
};
var checkableNodes = findNodes();

// Check/uncheck/toggle nodes
$("#inp-search-object").on("keyup", function (e) {
    checkableNodes = findNodes();
    // console.log(checkableNodes);
    $resultTree = $("#treeview-result-search").treeview({
        data: checkableNodes,
        showCheckbox: true,
    });
    // $('.check-node').prop('disabled', !(checkableNodes.length >= 1));
});

// $('#btn-check-node.check-node').on('click', function (e) {
//     $tree.treeview('checkNode', [ checkableNodes, { silent: $('#chk-check-silent').is(':checked') }]);
// });

// $('#btn-uncheck-node.check-node').on('click', function (e) {
//     $tree.treeview('uncheckNode', [ checkableNodes, { silent: $('#chk-check-silent').is(':checked') }]);
// });

// $('#btn-toggle-checked.check-node').on('click', function (e) {
//     $tree.treeview('toggleNodeChecked', [ checkableNodes, { silent: $('#chk-check-silent').is(':checked') }]);
// });

// // Check/uncheck all
// $('#btn-check-all').on('click', function (e) {
//     $tree.treeview('checkAll', { silent: $('#chk-check-silent').is(':checked') });
// });

// $('#btn-uncheck-all').on('click', function (e) {
//     $tree.treeview('uncheckAll', { silent: $('#chk-check-silent').is(':checked') });
// });
